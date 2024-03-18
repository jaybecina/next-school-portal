import React from "react";

const MapEmbed = () => {
  return (
    <div className="flex justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.6728757721835!2d121.01013407510537!3d14.560689985920954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90845a0dbdf%3A0x7fb8ae12e5782c35!2sCentro%20Escolar%20University%2C%20Makati%20Campus!5e0!3m2!1sen!2sph!4v1702659058128!5m2!1sen!2sph"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
