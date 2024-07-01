"use client";
import "./about.css";
import Image from "next/image";
const Page = () => {
  return (
    <div className="about-container">
      <section className="about-h1">Tentang Blog</section>
      <section className="about-content">
        <p>Selamat datang di agungcipta!</p>
        <p>
          Website ini dibuat untuk memenuhi tugas mata kuliah Pemrograman
          Database di Universitas Banten Jaya. Kami berusaha untuk
          mengimplementasikan konsep-konsep yang telah dipelajari selama
          perkuliahan ke dalam sebuah proyek nyata yang dapat digunakan oleh
          banyak orang.
        </p>
        <h1>Pengembang</h1>
        <div className="about__content-pengembang">
          <div className="agung">
            <Image width={100} height={100} src="/Foto nih.png" alt="Agung" />
            <caption>Muhamad Agung Maulana</caption>
            <span>NPM 1101221114</span>
          </div>
          <div className="febri">
            <Image width={100} height={100} src="/agung.png" alt="Agung" />
            <caption>Febri Ari Wijaya</caption>
            <span>NPM 1101221114</span>
          </div>
        </div>
        <p>
          Kami adalah mahasiswa yang tertarik dengan teknologi web dan
          pengembangan aplikasi. Melalui proyek ini, kami ingin menunjukkan
          kemampuan kami dalam menggunakan teknologi modern seperti Next.js
          untuk membangun aplikasi web yang responsif dan dinamis.
        </p>
        <h1>Dosen Pengajar</h1>
        <p>
          Kami mengucapkan terima kasih kepada dosen pembimbing kami, Bapak Dedi
          Juliansyah, S.Kom., M.Kom., yang telah membimbing dan mendukung kami
          selama proses pengembangan proyek ini.
        </p>
        <h1>Universitas</h1>
        <p>
          Proyek ini merupakan bagian dari tugas mata kuliah di Universitas
          Banten Jaya. Kami bangga menjadi bagian dari universitas ini dan
          berterima kasih atas semua dukungan yang telah diberikan oleh para
          dosen dan staf.
        </p>
        <p>
          Terima kasih telah mengunjungi website kami. Kami berharap website ini
          bermanfaat bagi Anda dan memberikan wawasan lebih tentang kemampuan
          kami dalam pengembangan web.
        </p>
      </section>
    </div>
  );
};
export default Page;
