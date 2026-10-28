import { report } from "@/data/report";
import { AnimatedCounter } from "./motion/AnimatedCounter";
import { impactCounters } from "@/data/hero-slides";
export function Report({ profiles = false }: { profiles?: boolean }) {
  return (
    <section className="wrap section report">
      <p className="eyebrow">Rujukan presentasi · Kelompok 7</p>
      <h2>{report.title}</h2>
      <p className="sample-note">{report.attribution}</p>
      <dl className="counter-grid">
        {impactCounters.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>
              <AnimatedCounter
                value={metric.value}
                decimals={metric.decimals}
                suffix={metric.suffix}
              />
            </dd>
          </div>
        ))}
      </dl>
      <p className="fine-print">
        September 2026 · PDF halaman 2 dan 7. Partisipasi: 238 dari 315 rumah.
      </p>
      {profiles ? (
        <>
          <h3>Profil sensus wilayah</h3>
          <div className="table-scroll">
            <table>
              <caption>Rekap Agustus–September 2026 · PDF halaman 2</caption>
              <thead>
                <tr>
                  <th>Wilayah</th>
                  <th>Bangunan rumah</th>
                  <th>RT</th>
                  <th>Jiwa memilah (Agustus → September)</th>
                </tr>
              </thead>
              <tbody>
                {report.profiles.map((p) => (
                  <tr key={p.rw}>
                    <th>{p.rw}</th>
                    <td>{p.houses}</td>
                    <td>{p.rt}</td>
                    <td>{p.sorting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fine-print">
            Bangunan rumah bukan jumlah KK; jiwa memilah bukan seluruh penduduk.
            Jumlah KK dan penduduk total belum tersedia.
          </p>
        </>
      ) : (
        <>
          <ul className="simple-list">
            {report.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="table-scroll">
            <table>
              <caption>Target dan realisasi menurut PDF halaman 4</caption>
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Target</th>
                  <th>Realisasi dokumen</th>
                  <th>Capaian</th>
                </tr>
              </thead>
              <tbody>
                {report.programs.map((p) => (
                  <tr key={p.name}>
                    <th>{p.name}</th>
                    <td>{p.target}</td>
                    <td>{p.result}</td>
                    <td>{p.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3>Perubahan Agustus → September 2026</h3>
          {report.impact.map((i) => (
            <div className="report-impact" key={i.label}>
              <h4>{i.label}</h4>
              <p>
                {i.before} → <strong>{i.after}</strong>
              </p>
              <p>{i.note}</p>
            </div>
          ))}
          <p className="fine-print">
            Sumber: PDF halaman 7–8. Rekomendasi keberlanjutan halaman 10 adalah
            rencana tindak lanjut, bukan serah terima yang sudah terlaksana.
          </p>
        </>
      )}
    </section>
  );
}
