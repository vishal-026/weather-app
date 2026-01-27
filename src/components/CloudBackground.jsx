import React from 'react';

function CloudBackground() {
    // Generate random clouds with different speeds and positions
    const clouds = Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 40}%`, // Top 40% of screen
        left: `-${Math.random() * 20}%`,
        scale: 0.5 + Math.random() * 1, // Random size
        duration: 20 + Math.random() * 20, // 20-40s duration
        delay: Math.random() * -20, // Start at different times
        opacity: 0.3 + Math.random() * 0.4,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {clouds.map((cloud) => (
                <div
                    key={cloud.id}
                    className="cloud-animation absolute bg-white blur-2xl rounded-full"
                    style={{
                        top: cloud.top,
                        left: cloud.left,
                        width: `${200 * cloud.scale}px`,
                        height: `${100 * cloud.scale}px`,
                        animationDuration: `${cloud.duration}s`,
                        animationDelay: `${cloud.delay}s`,
                        opacity: cloud.opacity,
                    }}
                />
            ))}
            {/* Add a few more specific SVG style clouds for better shape if simple blobs aren't enough, 
          but blurred blobs usually look good for "atmosphere" */}
        </div>
    );
}

export default CloudBackground;
