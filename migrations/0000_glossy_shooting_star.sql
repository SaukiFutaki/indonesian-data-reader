CREATE TABLE `kodepos` (
	`id` text PRIMARY KEY NOT NULL,
	`code` integer NOT NULL,
	`village` text NOT NULL,
	`district` text NOT NULL,
	`regency` text NOT NULL,
	`province` text NOT NULL,
	`latitude` real,
	`longitude` real,
	`elevation` integer,
	`timezone` text
);
--> statement-breakpoint
CREATE INDEX `idx_kodepos_code` ON `kodepos` (`code`);--> statement-breakpoint
CREATE INDEX `idx_kodepos_village` ON `kodepos` (`village`);--> statement-breakpoint
CREATE INDEX `idx_kodepos_district` ON `kodepos` (`district`);--> statement-breakpoint
CREATE INDEX `idx_kodepos_province_regency` ON `kodepos` (`province`,`regency`);--> statement-breakpoint
CREATE TABLE `sekolah` (
	`id` text PRIMARY KEY NOT NULL,
	`kode_prop` text,
	`propinsi` text,
	`kode_kab_kota` text,
	`kabupaten_kota` text,
	`kode_kec` text,
	`kecamatan` text,
	`ref_id` text,
	`npsn` text NOT NULL,
	`sekolah` text NOT NULL,
	`bentuk` text,
	`status` text,
	`alamat_jalan` text,
	`lintang` real,
	`bujur` real
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sekolah_npsn_unique` ON `sekolah` (`npsn`);--> statement-breakpoint
CREATE INDEX `idx_sekolah_nama` ON `sekolah` (`sekolah`);--> statement-breakpoint
CREATE INDEX `idx_sekolah_bentuk` ON `sekolah` (`bentuk`);--> statement-breakpoint
CREATE INDEX `idx_sekolah_kabupaten` ON `sekolah` (`kabupaten_kota`);--> statement-breakpoint
CREATE INDEX `idx_sekolah_kecamatan` ON `sekolah` (`kecamatan`);--> statement-breakpoint
CREATE INDEX `idx_sekolah_propinsi_kabupaten` ON `sekolah` (`propinsi`,`kabupaten_kota`);