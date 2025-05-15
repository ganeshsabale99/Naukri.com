import React from "react";
import Content from "./Content";
import styles from "./Footer.module.css";
import SliderTest from "./SliderTest";

const Footer = () => {
  const footer = ["About Us", "Careers", "Employer home", "Sitemap", "Credits"];

  const footerb = [
    "Help center",
    "Summons/Notices",
    "Grievances",
    "Report issue",
  ];

  const footerC = [
    "Privacy policy",
    "Terms & conditions",
    "Fraud alert",
    "Trust & safety",
  ];

  return (
    <div className={styles.main}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div className={styles.footer_contentA}>
          <div className={styles.footerA}>
            {/* <Content data={footer} /> */}
            <img className={styles.logo} src="https://static.naukimg.com/s/4/100/i/naukri_Logo.png" alt="" />
          </div>

          <div className={styles.footerA}>
            <Content data={footerb} />
          </div>

          <div className={styles.footerA}>
            <Content data={footerC} />
          </div>
        </div>
        <div className={styles.footer_content}>
          <div className={styles.footerA}>
            <Content data={footer} />
          </div>

          <div className={styles.footerA}>
            <Content data={footerb} />
          </div>

          <div className={styles.footerA}>
            <Content data={footerC} />
          </div>
        </div>
        <div className={styles.footer_contentB}>
          <div className={styles.footerA}>
            <Content data={footer} />
          </div>

          <div className={styles.footerA}>
            <Content data={footerb} />
          </div>

          <div className={styles.footerA}>
            <Content data={footerC} />
          </div>
        </div>
      </div>
      <div className={styles.bottomdiv}>
        <div className={styles.sliderLogo}>
          <div className={styles.logoSilder}>
            <p>Partner Sites</p>
            <SliderTest />
          </div>
        </div>
        <div className={styles.bottomFooter}>
          <p>All rights reserved @ 2022 Info Edge (India) Ltd.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
