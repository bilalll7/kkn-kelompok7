"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
export function ContactForm({ email }: { email: string | null }) {
  const [notice, setNotice] = useState("");
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!email) {
          setNotice(
            "Pesan belum dikirim. Alamat email resmi belum tersedia; formulir ini merupakan pratinjau.",
          );
          return;
        }
        const body = `Nama: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(body)}`;
        setNotice(
          "Aplikasi email Anda akan dibuka. Periksa pesan lalu kirim melalui aplikasi email tersebut. Situs ini tidak mengirim atau menyimpan pesan.",
        );
      }}
    >
      <div className="form-row">
        <label>
          Nama lengkap
          <input
            name="name"
            autoComplete="name"
            placeholder="Nama Anda"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            required
          />
        </label>
      </div>
      <label>
        Perihal
        <select name="subject" defaultValue="Informasi wilayah">
          <option>Informasi wilayah</option>
          <option>Usaha & potensi lokal</option>
          <option>Kegiatan KKN</option>
          <option>Koreksi informasi</option>
          <option>Lainnya</option>
        </select>
      </label>
      <label>
        Pesan
        <textarea
          name="message"
          rows={5}
          placeholder="Apa yang ingin Anda sampaikan?"
          required
          maxLength={3000}
        />
      </label>
      <p className="fine-print" id="form-help">
        {email
          ? "Pesan diteruskan ke aplikasi email Anda. Tidak ada data yang disimpan oleh situs ini."
          : "Pratinjau formulir — pengiriman belum tersedia karena kontak resmi belum dikonfigurasi. Tidak ada data yang disimpan."}{" "}
        Jangan cantumkan NIK atau data pribadi sensitif.
      </p>
      <button type="submit" className="button" aria-describedby="form-help">
        {email ? "Lanjutkan melalui email" : "Periksa status pengiriman"}
        <ArrowUpRight size={18} />
      </button>
      <p role="status" className="form-status">
        {notice}
      </p>
    </form>
  );
}
