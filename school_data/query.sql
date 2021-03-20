-- Table: public.graduation_data

 DROP TABLE public.graduation_data;

CREATE TABLE public.graduation_data
(
    nces_lea_id character varying(50) COLLATE pg_catalog."default",
    state_id character varying(50) COLLATE pg_catalog."default",
    district_name character varying(50) COLLATE pg_catalog."default",
    mailing_address character varying(50) COLLATE pg_catalog."default",
    city character varying(50) COLLATE pg_catalog."default",
    state_abbr character varying(50) COLLATE pg_catalog."default",
    zip_code character varying(50) COLLATE pg_catalog."default",
    zip_4 character varying(50) COLLATE pg_catalog."default",
	telephone character varying(50) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.graduation_data
    OWNER to postgres;