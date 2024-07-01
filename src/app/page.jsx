import { Lato } from "next/font/google";
import Image from "next/image";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return (
    <div className="home-container">
      {/* Section pertama */}
      <section className="home-first">
        <div className="title">
          <h1 className={lato.className}>
            <span>AgungCipta</span> Blog Site
          </h1>
        </div>

        <div className="search-container">
          <input
            type="search"
            name="search"
            id="searchInput"
            className="search-input"
            placeholder="Ketikkan pencarian..."
          />
          <button className="search-button">Cari</button>
        </div>

        <div className="description-container">
          <p>
            Selamat datang di AgungCipta BlogSite, tempat di mana Anda dapat
            menjelajahi dunia pengetahuan melalui artikel-artikel inspiratif,
            cerita menarik tentang berbagai topik yang relevan dan menarik.
          </p>
        </div>
      </section>

      {/* Section kedua */}
      <section className="home-second">
        <div className="title-second">
          <h1 className={lato.className}>Ingin menjadi penulis?</h1>
          <div className="isi-second">
            <Image
              src="/second-isi.png"
              width={200}
              height={200}
              alt="Writer image"
              draggable="false"
            />
            <div className="home-second__description">
              <p>
                Ingin berbagi wawasan dan cerita Anda dengan dunia? Jadilah
                penulis di AgungCipta BlogSite! Kontak kami sekarang untuk
                memulai perjalanan Anda dalam berkontribusi dan menginspirasi
                melalui tulisan.
              </p>
              <button>Daftar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
