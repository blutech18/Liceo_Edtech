const Footer = () => {
  return (
    <footer className="bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-primary-foreground text-sm">
            © {new Date().getFullYear()} Liceo Educational Technology Center. All rights reserved.
          </p>
          <p className="text-primary-foreground/70 text-xs mt-2">
            Empowering Education Through Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
