import React from 'react';

const SpecialOffers = () => {
    // Sample data for special offers and promotions
    const offers = [
        {
            id: 1,
            title: "Spring Savings",
            description: "Book now and enjoy 20% off on luxury car rentals this spring!",
            validUntil: "Valid until: May 31, 2024"
        },
        {
            id: 2,
            title: "Weekend Getaway",
            description: "Plan your weekend getaway and receive a complimentary upgrade to a premium vehicle.",
            validUntil: "Valid until: December 31, 2024"
        }
    ];

    return (
        <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '50px', 
            borderRadius: '2px', 
           
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px',fontSize:22 }}>Special Offers & Promotions</h2>
            <div>
                {offers.map(offer => (
                    <div key={offer.id} style={{ marginBottom: '50px', padding: '30px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <h3 style={{ marginBottom: '10px' }}>{offer.title}</h3>
                        <p style={{ marginBottom: '10px' }}>{offer.description}</p>
                        <p style={{ color: '#666' }}>Validity: {offer.validUntil}</p>
                        <button style={{ 
                            backgroundColor: '#0f4037', 
                            color: '#fff', 
                            padding: '8px 16px', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}>Learn More</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialOffers;
