--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.9
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-08-28 14:51:22 BRT

--SET statement_timeout = 0;
--SET lock_timeout = 0;
--SET client_encoding = 'UTF8';
--SET standard_conforming_strings = on;
--SET check_function_bodies = false;
--SET client_min_messages = warning;
--SET row_security = off;

--SET search_path = public, pg_catalog;

--SET default_tablespace = '';

--SET default_with_oids = false;

--
-- TOC entry 186 (class 1259 OID 16666)
-- Name: profession; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE profession (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


ALTER TABLE profession OWNER TO seubiu;

--
-- TOC entry 185 (class 1259 OID 16664)
-- Name: profession_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE profession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE profession_id_seq OWNER TO seubiu;

--
-- TOC entry 2082 (class 0 OID 0)
-- Dependencies: 185
-- Name: profession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE profession_id_seq OWNED BY profession.id;


--
-- TOC entry 187 (class 1259 OID 16676)
-- Name: profession_services; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE profession_services (
    profession_id integer NOT NULL,
    services_id integer NOT NULL
);


ALTER TABLE profession_services OWNER TO seubiu;

--
-- TOC entry 184 (class 1259 OID 16654)
-- Name: service; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE service (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


ALTER TABLE service OWNER TO seubiu;

--
-- TOC entry 183 (class 1259 OID 16652)
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE service_id_seq OWNER TO seubiu;

--
-- TOC entry 2083 (class 0 OID 0)
-- Dependencies: 183
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE service_id_seq OWNED BY service.id;


--
-- TOC entry 180 (class 1259 OID 16627)
-- Name: user; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE "user" (
    id integer NOT NULL,
    name text NOT NULL,
    "displayName" text,
    email text NOT NULL,
    "emailVerified" boolean DEFAULT false,
    password text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone,
    status_id integer NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE "user" OWNER TO seubiu;

--
-- TOC entry 179 (class 1259 OID 16625)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO seubiu;

--
-- TOC entry 2084 (class 0 OID 0)
-- Dependencies: 179
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 181 (class 1259 OID 16638)
-- Name: user_professions; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_professions (
    user_id integer NOT NULL,
    professions_id integer NOT NULL
);


ALTER TABLE user_professions OWNER TO seubiu;

--
-- TOC entry 182 (class 1259 OID 16645)
-- Name: user_services; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_services (
    user_id integer NOT NULL,
    services_id integer NOT NULL
);


ALTER TABLE user_services OWNER TO seubiu;

--
-- TOC entry 178 (class 1259 OID 16615)
-- Name: user_status; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_status (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


ALTER TABLE user_status OWNER TO seubiu;

--
-- TOC entry 177 (class 1259 OID 16613)
-- Name: user_status_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE user_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_status_id_seq OWNER TO seubiu;

--
-- TOC entry 2085 (class 0 OID 0)
-- Dependencies: 177
-- Name: user_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE user_status_id_seq OWNED BY user_status.id;


--
-- TOC entry 176 (class 1259 OID 16603)
-- Name: user_type; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_type (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


ALTER TABLE user_type OWNER TO seubiu;

--
-- TOC entry 175 (class 1259 OID 16601)
-- Name: user_type_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE user_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_type_id_seq OWNER TO seubiu;

--
-- TOC entry 2086 (class 0 OID 0)
-- Dependencies: 175
-- Name: user_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE user_type_id_seq OWNED BY user_type.id;


--
-- TOC entry 1928 (class 2604 OID 16669)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY profession ALTER COLUMN id SET DEFAULT nextval('profession_id_seq'::regclass);


--
-- TOC entry 1927 (class 2604 OID 16657)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY service ALTER COLUMN id SET DEFAULT nextval('service_id_seq'::regclass);


--
-- TOC entry 1925 (class 2604 OID 16630)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1924 (class 2604 OID 16618)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_status ALTER COLUMN id SET DEFAULT nextval('user_status_id_seq'::regclass);


--
-- TOC entry 1923 (class 2604 OID 16606)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_type ALTER COLUMN id SET DEFAULT nextval('user_type_id_seq'::regclass);


--
-- TOC entry 2076 (class 0 OID 16666)
-- Dependencies: 186
-- Data for Name: profession; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2087 (class 0 OID 0)
-- Dependencies: 185
-- Name: profession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('profession_id_seq', 1, false);


--
-- TOC entry 2077 (class 0 OID 16676)
-- Dependencies: 187
-- Data for Name: profession_services; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2074 (class 0 OID 16654)
-- Dependencies: 184
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2088 (class 0 OID 0)
-- Dependencies: 183
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('service_id_seq', 1, false);


--
-- TOC entry 2070 (class 0 OID 16627)
-- Dependencies: 180
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2089 (class 0 OID 0)
-- Dependencies: 179
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('user_id_seq', 1, false);


--
-- TOC entry 2071 (class 0 OID 16638)
-- Dependencies: 181
-- Data for Name: user_professions; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2072 (class 0 OID 16645)
-- Dependencies: 182
-- Data for Name: user_services; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2068 (class 0 OID 16615)
-- Dependencies: 178
-- Data for Name: user_status; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2090 (class 0 OID 0)
-- Dependencies: 177
-- Name: user_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('user_status_id_seq', 1, false);


--
-- TOC entry 2066 (class 0 OID 16603)
-- Dependencies: 176
-- Data for Name: user_type; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2091 (class 0 OID 0)
-- Dependencies: 175
-- Name: user_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('user_type_id_seq', 1, false);


--
-- TOC entry 1951 (class 2606 OID 16674)
-- Name: profession_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY profession
    ADD CONSTRAINT profession_pkey PRIMARY KEY (id);


--
-- TOC entry 1953 (class 2606 OID 16680)
-- Name: profession_services_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY profession_services
    ADD CONSTRAINT profession_services_pkey PRIMARY KEY (profession_id, services_id);


--
-- TOC entry 1948 (class 2606 OID 16662)
-- Name: service_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- TOC entry 1937 (class 2606 OID 16636)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 1939 (class 2606 OID 16642)
-- Name: user_professions_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_professions
    ADD CONSTRAINT user_professions_pkey PRIMARY KEY (user_id, professions_id);


--
-- TOC entry 1943 (class 2606 OID 16649)
-- Name: user_services_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_services
    ADD CONSTRAINT user_services_pkey PRIMARY KEY (user_id, services_id);


--
-- TOC entry 1934 (class 2606 OID 16623)
-- Name: user_status_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_status
    ADD CONSTRAINT user_status_pkey PRIMARY KEY (id);


--
-- TOC entry 1931 (class 2606 OID 16611)
-- Name: user_type_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);


--
-- TOC entry 1949 (class 1259 OID 16675)
-- Name: profession_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX profession_description_unique ON profession USING btree (description);


--
-- TOC entry 1954 (class 1259 OID 16681)
-- Name: profession_services_profession_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX profession_services_profession_id_index ON profession_services USING btree (profession_id);


--
-- TOC entry 1955 (class 1259 OID 16682)
-- Name: profession_services_services_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX profession_services_services_id_index ON profession_services USING btree (services_id);


--
-- TOC entry 1946 (class 1259 OID 16663)
-- Name: service_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX service_description_unique ON service USING btree (description);


--
-- TOC entry 1935 (class 1259 OID 16637)
-- Name: user_email_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX user_email_unique ON "user" USING btree (email);


--
-- TOC entry 1940 (class 1259 OID 16644)
-- Name: user_professions_professions_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_professions_professions_id_index ON user_professions USING btree (professions_id);


--
-- TOC entry 1941 (class 1259 OID 16643)
-- Name: user_professions_user_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_professions_user_id_index ON user_professions USING btree (user_id);


--
-- TOC entry 1944 (class 1259 OID 16651)
-- Name: user_services_services_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_services_services_id_index ON user_services USING btree (services_id);


--
-- TOC entry 1945 (class 1259 OID 16650)
-- Name: user_services_user_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_services_user_id_index ON user_services USING btree (user_id);


--
-- TOC entry 1932 (class 1259 OID 16624)
-- Name: user_status_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX user_status_description_unique ON user_status USING btree (description);


--
-- TOC entry 1929 (class 1259 OID 16612)
-- Name: user_type_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX user_type_description_unique ON user_type USING btree (description);


-- Completed on 2016-08-28 14:51:22 BRT

--
-- PostgreSQL database dump complete
--

