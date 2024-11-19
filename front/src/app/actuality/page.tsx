"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, User, ArrowRight } from "lucide-react";
import styles from "./actuality.module.css";
import Image from "next/image"; // Import Image from next/image
import ActualitiesServices from "../API/ActualitiesServices";
import ApiUrls from "../API/ApiURLs/ApiURLs";
import { ActualityEntity } from "../entities/ActualityEntity";
import { useRouter } from "next/navigation";

const ActualityPage = () => {
  const [actualities, setActualities] = useState<ActualityEntity[] | []>([]);
  const router = useRouter();

  const getAllActualities = async ()=> {
    try {
        const response: ActualityEntity[] = await ActualitiesServices.GetAllActualities(ApiUrls.ACTUALITY);
        console.log(response);
        setActualities(response);
    } catch (error) { 
      console.error("Error fetching actualities:", error);
    }
  } 

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
    getAllActualities();
  }, []);


  return ( 
    <div className={styles.pageWrapper}>
      <div className="container mx-auto px-4">
        <h1 className={`${styles.title} text-center mb-12`}>Actualités Assurance</h1>
        
        <div className="space-y-16">
          {actualities.map((article, index) => (
            <div
              key={article.id}
              className={`${styles.articleContainer} ${
                index % 2 === 0 ? styles.slideRight : styles.slideLeft
              }`}
              data-aos="fade-up"
            >
              <div className={`${styles.glassCard} ${index % 2 !== 0 ? styles.reverseLayout : ''}`}>
                
                {/* Image with 3D overlay */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={"http://localhost:8000/storage/"+article.image}
                    alt={article.title}
                    width={1280} // Add appropriate width
                    height={720} // Add appropriate height
                    className="transition-transform duration-700 hover:scale-110"
                  />
                  
                  <div className={styles.overlay}>
                    <div className={styles.creatorInfo}>
                      <User className="w-4 h-4" />
                      {article.utilisateur?.firstname}
                    </div>
                    <div className={styles.dateInfo}>
                      <Calendar className="w-4 h-4" />
                      {article.date_creation}
                    </div>
                  </div>
                </div>

                {/* Content with scroll animation */}
                <div className={styles.contentWrapper}>
                  <h2 data-aos="fade-in" className={`text-2xl font-bold mb-4 text-white ${styles.titleArt}`}>
                    {article.title}
                  </h2>
                  
                  <p data-aos="fade-in" className={`text-gray-200 mb-6 text-lg leading-relaxed ${styles.contentArt1}`}>
                    {article.excerpt}
                  </p>
                  <p data-aos="fade-in" className={`text-gray-200 mb-6 text-lg leading-relaxed ${styles.contentArt2}`}>
                    {article.content}
                  </p>
                  
                  <button 
                    className={`${styles.readMore} group`} 
                    data-aos="fade-up"
                    onClick={() => router.push(`/actuality/${article.id}`)}
                  >
                    Lire la suite
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActualityPage;
