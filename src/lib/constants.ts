export const PERSONAL_INFO = {
  name: "Shivam Tonpe",
  role: "Full Stack Developer · AI Workflow Developer · Backend Developer",
  email: "shivamtonpe175@gmail.com",
  phone: "+91 9321446403",
  github: "https://github.com/shivam77kk",
  linkedin: "https://www.linkedin.com/in/shivam-tonpe/",
  location: "Thane, Maharashtra, India 🇮🇳",
  college: "Sahyog College of IT and Management, KKSU University (BCA Pursuing)"
};

export const GMAIL_COMPOSE_URL = 
  `https://mail.google.com/mail/?view=cm&fs=1` +
  `&to=shivamtonpe175@gmail.com` +
  `&su=Opportunity%20from%20Portfolio%20Visit` +
  `&body=Hi%20Shivam%2C%0A%0AI%20saw%20your%20portfolio%20and%20wanted%20to%20connect!%0A%0A` +
  `Best%20regards%2C`;

export const MAILTO_URL = 
  `mailto:shivamtonpe175@gmail.com` +
  `?subject=Opportunity%20from%20Portfolio%20Visit` +
  `&body=Hi%20Shivam%2C%0A%0AI%20saw%20your%20portfolio%20and%20wanted%20to%20connect!`;

export function openEmail() {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = MAILTO_URL;
  } else {
    window.open(GMAIL_COMPOSE_URL, '_blank');
  }
}

export const WHATSAPP_URL = "https://wa.me/919321446403?text=Hi%20Shivam%2C%20I%20saw%20your%20portfolio!";
