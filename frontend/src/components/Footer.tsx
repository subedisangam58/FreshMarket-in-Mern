import React from 'react'

function Footer() {
    return (
        <div className="bg-gray-800 text-white py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">© 2025 FreshMarket. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
                    <a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a>
                </div>
                <div className="mt-2">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <img src="/images/facebook-icon.png" alt="Facebook" className="w-5 h-5 inline" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <img src="/images/twitter-icon.png" alt="Twitter" className="w-5 h-5 inline" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <img src="/images/instagram-icon.png" alt="Instagram" className="w-5 h-5 inline" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <img src="/images/linkedin-icon.png" alt="LinkedIn" className="w-5 h-5 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
