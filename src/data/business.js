export const business = {
  name: 'IJO House of Beauty Unisex Salon',
  shortName: 'IJO House of Beauty',
  phoneDisplay: '08077008136',
  whatsappNumber: '2348077008136',
  instagramHandle: '@ilebejoy623',
  instagramUrl: 'https://www.instagram.com/ilebejoy623/',
  operatingDays: 'Monday – Saturday',
  bookingMessage: 'Hello IJO House of Beauty, I would like to make an appointment. Please share your available slots.',
};

export const whatsappUrl = (message = business.bookingMessage) =>
  'https://wa.me/' + business.whatsappNumber + '?text=' + encodeURIComponent(message);
