import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewSection = () => {
  // Data dummy ulasan
  const reviews = [
    {
      id: 1,
      name: 'Andi Pratama',
      rating: 5,
      comment: 'Aplikasi yang sangat membantu! Interface-nya mudah digunakan dan fitur-fiturnya lengkap. Sangat merekomendasikan untuk semua orang.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      date: '15 Mei 2024'
    },
    {
      id: 2,
      name: 'Sari Dewi',
      rating: 4,
      comment: 'Aplikasi yang bagus dengan performa yang cepat. Hanya perlu sedikit perbaikan di bagian notifikasi, tapi overall sangat puas.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c1?w=100&h=100&fit=crop&crop=face',
      date: '12 Mei 2024'
    },
    {
      id: 3,
      name: 'Rizky Firmansyah',
      rating: 5,
      comment: 'Luar biasa! Aplikasi ini benar-benar mengubah cara saya bekerja. Fitur-fitur canggihnya sangat membantu produktivitas sehari-hari.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: '10 Mei 2024'
    },
    {
      id: 4,
      name: 'Maya Sari',
      rating: 4,
      comment: 'Desainnya modern dan fungsional. Mudah dipahami bahkan untuk pemula. Tim support juga sangat responsif dalam membantu.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      date: '8 Mei 2024'
    },
    {
      id: 5,
      name: 'Bayu Wicaksono',
      rating: 5,
      comment: 'Aplikasi terbaik yang pernah saya gunakan! Semua fitur bekerja dengan sempurna dan tidak ada bug sama sekali. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      date: '5 Mei 2024'
    },
    {
      id: 6,
      name: 'Indira Putri',
      rating: 4,
      comment: 'Sangat membantu dalam mengelola pekerjaan. Interface yang clean dan user-friendly. Akan terus menggunakan aplikasi ini.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      date: '3 Mei 2024'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto slide setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Komponen Star Rating
  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors duration-200 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Menghitung 3 reviews yang terlihat secara horizontal
  const getVisibleReviews = () => {
    const visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  return (
    <section className="py-16   ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Pengguna Kami?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dengarkan pengalaman ribuan pengguna yang telah merasakan manfaat aplikasi kami
          </p>
        </div>

        {/* Review Cards Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Three Reviews Horizontal */}
          <div className="overflow-hidden mx-4 lg:mx-12">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-600 ease-in-out ${
                isAnimating 
                  ? 'opacity-70 transform translate-x-8 scale-98' 
                  : 'opacity-100 transform translate-x-0 scale-100'
              }`}
            >
              {getVisibleReviews().map((review, index) => (
                <div
                  key={`${review.id}-${currentIndex}-${index}`}
                  className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative group"
                >
                  {/* Decorative Quote */}
                  <div className="absolute top-4 right-4 text-5xl lg:text-6xl text-blue-100 font-serif leading-none opacity-50 group-hover:opacity-70 transition-opacity">
                    "
                  </div>

                  {/* User Info */}
                  <div className="flex items-center mb-4 lg:mb-6 relative z-10">
                    <div className="relative">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-3 ring-blue-100 transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-200"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-3 lg:ml-4">
                      <h4 className="font-bold text-gray-900 text-lg lg:text-xl">
                        {review.name}
                      </h4>
                      <p className="text-gray-500 text-xs lg:text-sm">{review.date}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4 lg:mb-6 relative z-10">
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Comment */}
                  <div className="relative z-10">
                    <p className="text-gray-700 leading-relaxed text-sm lg:text-base italic font-medium line-clamp-4">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 rounded-2xl pointer-events-none group-hover:to-blue-50/40 transition-all duration-300"></div>
                  
                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                } disabled:cursor-not-allowed`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
            <div className="text-gray-600">Rating Rata-rata</div>
            
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Pengguna Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Tingkat Kepuasan</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;