
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="flex items-center justify-center gap-1">
        Made with <Heart size={16} className="text-accent animate-pulse" /> by 
        <span className="font-semibold text-accent"> Yasheela Alla</span>
      </div>
      <div className="text-sm mt-1">
        © {currentYear} Vibra Streaming Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
