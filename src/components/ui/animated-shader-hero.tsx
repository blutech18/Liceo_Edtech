import React, { useRef, useEffect, useState } from 'react';

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2?: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

// Optimized maroon-themed shader - reduced complexity for better performance
const maroonShaderSource = `#version 300 es
precision mediump float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution

float rnd(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = rnd(i);
  float b = rnd(i + vec2(1.0, 0.0));
  float c = rnd(i + vec2(0.0, 1.0));
  float d = rnd(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float t = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    t += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return t;
}

void main(void) {
  vec2 uv = (FC - 0.5 * R) / min(R.x, R.y);
  
  // Simplified cloud effect
  float n1 = fbm(uv * 2.0 + T * 0.1);
  float n2 = fbm(uv * 3.0 - T * 0.05);
  
  // Maroon color palette
  vec3 col1 = vec3(0.5, 0.05, 0.1);  // Deep maroon
  vec3 col2 = vec3(0.2, 0.02, 0.04); // Darker maroon
  vec3 col3 = vec3(0.06, 0.02, 0.03); // Almost black
  
  // Mix colors based on noise
  vec3 col = mix(col3, col2, n1);
  col = mix(col, col1, n2 * 0.5);
  
  // Add subtle glow in center
  float d = length(uv);
  col += vec3(0.15, 0.02, 0.04) * (1.0 - smoothstep(0.0, 1.5, d));
  
  // Vignette
  col *= 1.0 - d * 0.3;
  
  O = vec4(col, 1.0);
}`;

// Optimized WebGL Renderer with performance features
class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private isDestroyed = false;

  private vertexSrc = `#version 300 es
precision mediump float;
in vec4 position;
void main() { gl_Position = position; }`;

  private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false
    });
    
    if (!gl) {
      console.warn('WebGL2 not supported');
      return;
    }
    
    this.gl = gl;
  }

  setup() {
    const gl = this.gl;
    if (!gl) return false;

    // Create and compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vs || !fs) return false;

    gl.shaderSource(vs, this.vertexSrc);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vs));
      return false;
    }

    gl.shaderSource(fs, maroonShaderSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fs));
      return false;
    }

    // Create program
    this.program = gl.createProgram();
    if (!this.program) return false;

    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(this.program));
      return false;
    }

    // Clean up shaders (they're linked to program now)
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    // Setup buffer
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    return true;
  }

  resize(width: number, height: number) {
    if (!this.gl) return;
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  render(time: number) {
    const gl = this.gl;
    const program = this.program;
    
    if (!gl || !program || this.isDestroyed) return;

    gl.useProgram(program);
    
    const resolutionLoc = gl.getUniformLocation(program, 'resolution');
    const timeLoc = gl.getUniformLocation(program, 'time');
    
    gl.uniform2f(resolutionLoc, this.canvas.width, this.canvas.height);
    gl.uniform1f(timeLoc, time * 0.001);
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    this.isDestroyed = true;
    const gl = this.gl;
    if (!gl) return;

    if (this.program) {
      gl.deleteProgram(this.program);
    }
    if (this.buffer) {
      gl.deleteBuffer(this.buffer);
    }
  }
}

// Custom hook with visibility-based rendering
const useOptimizedShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const rafRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Use lower resolution for performance
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const width = Math.floor(window.innerWidth * dpr);
    const height = Math.floor(window.innerHeight * dpr);
    
    canvas.width = width;
    canvas.height = height;

    rendererRef.current = new WebGLRenderer(canvas);
    
    if (!rendererRef.current.setup()) {
      setIsSupported(false);
      return;
    }

    rendererRef.current.resize(width, height);

    let lastTime = 0;
    const targetFPS = 30; // Limit to 30 FPS for performance
    const frameInterval = 1000 / targetFPS;

    const loop = (now: number) => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const delta = now - lastTime;
      
      if (delta >= frameInterval) {
        rendererRef.current?.render(now);
        lastTime = now - (delta % frameInterval);
      }
      
      rafRef.current = requestAnimationFrame(loop);
    };

    // Intersection Observer for visibility-based rendering
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvasRef.current || !rendererRef.current) return;
        const dpr = Math.min(window.devicePixelRatio, 1.5);
        const w = Math.floor(window.innerWidth * dpr);
        const h = Math.floor(window.innerHeight * dpr);
        rendererRef.current.resize(w, h);
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(resizeTimeout);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rendererRef.current?.destroy();
    };
  }, []);

  return { canvasRef, isSupported };
};

// Maroon-themed Hero Component for Liceo EdTech
const AnimatedShaderHero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = ""
}) => {
  const { canvasRef, isSupported } = useOptimizedShader();

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden ${className}`} 
      style={{ backgroundColor: '#0F0F0F' }}
    >
      <style>{`
        @keyframes fade-in-up-hero {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-animate {
          animation: fade-in-up-hero 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.2s; }
        .hero-delay-3 { animation-delay: 0.3s; }
        .hero-delay-4 { animation-delay: 0.4s; }
      `}</style>
      
      {/* WebGL Canvas or Fallback Gradient */}
      {isSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: '#0F0F0F',
            imageRendering: 'auto'
          }}
        />
      ) : (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, #2a0a0e 0%, #0F0F0F 70%)'
          }}
        />
      )}
      
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4">
        {/* Trust Badge */}
        {trustBadge && (
          <div className="mb-6 hero-animate hero-delay-1">
            <div 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
              style={{ 
                backgroundColor: 'rgba(160, 16, 16, 0.2)',
                border: '1px solid rgba(160, 16, 16, 0.4)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {trustBadge.icons && (
                <span style={{ color: '#A01010' }}>
                  {trustBadge.icons[0]}
                </span>
              )}
              <span style={{ color: '#CCCCCC' }}>{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-5 max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="space-y-2">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold hero-animate hero-delay-2"
              style={{ 
                background: 'linear-gradient(135deg, #FF6B6B 0%, #A01010 50%, #800000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {headline.line1}
            </h1>
            {headline.line2 && (
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold hero-animate hero-delay-2"
                style={{ 
                  background: 'linear-gradient(135deg, #A01010 0%, #800000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {headline.line2}
              </h1>
            )}
          </div>
          
          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto hero-animate hero-delay-3"
            style={{ color: '#CCCCCC' }}
          >
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 hero-animate hero-delay-4">
              {buttons.primary && (
                <button 
                  onClick={buttons.primary.onClick}
                  className="px-7 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
                  style={{ 
                    background: 'linear-gradient(135deg, #A01010 0%, #800000 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(160, 16, 16, 0.3)'
                  }}
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button 
                  onClick={buttons.secondary.onClick}
                  className="px-7 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: 'rgba(160, 16, 16, 0.15)',
                    border: '1px solid rgba(160, 16, 16, 0.4)',
                    color: '#FFFFFF'
                  }}
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedShaderHero;
