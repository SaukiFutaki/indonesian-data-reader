import { index } from "drizzle-orm/sqlite-core";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const kodepos = sqliteTable(
  "kodepos",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    code: integer("code").notNull(),
    village: text("village").notNull(),
    district: text("district").notNull(),
    regency: text("regency").notNull(),
    province: text("province").notNull(),
    latitude: real("latitude"),
    longitude: real("longitude"),
    elevation: integer("elevation"),
    timezone: text("timezone"),
  },
  (table) => [
    index("idx_kodepos_code").on(table.code),
    index("idx_kodepos_village").on(table.village),
    index("idx_kodepos_district").on(table.district),
    index("idx_kodepos_province_regency").on(table.province, table.regency),
  ]
);

export const sekolah = sqliteTable(
  "sekolah",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    kodeProp: text("kode_prop"),
    propinsi: text("propinsi"),
    kodeKabKota: text("kode_kab_kota"),
    kabupatenKota: text("kabupaten_kota"),
    kodeKec: text("kode_kec"),
    kecamatan: text("kecamatan"),
    refId: text("ref_id"),
    npsn: text("npsn").notNull().unique(),
    sekolah: text("sekolah").notNull(),
    bentuk: text("bentuk"),
    status: text("status"),
    alamatJalan: text("alamat_jalan"),
    lintang: real("lintang"),
    bujur: real("bujur"),
  },
  (table) => [
    index("idx_sekolah_nama").on(table.sekolah),
    index("idx_sekolah_bentuk").on(table.bentuk),
    index("idx_sekolah_kabupaten").on(table.kabupatenKota),
    index("idx_sekolah_kecamatan").on(table.kecamatan),
    index("idx_sekolah_propinsi_kabupaten").on(table.propinsi, table.kabupatenKota),
  ]
);
