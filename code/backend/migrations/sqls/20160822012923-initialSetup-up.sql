--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.9
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-09-01 01:40:33 BRT

--
-- TOC entry 176 (class 1259 OID 34678)
-- Name: profession; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE profession (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


--
-- TOC entry 175 (class 1259 OID 34676)
-- Name: profession_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE profession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2089 (class 0 OID 0)
-- Dependencies: 175
-- Name: profession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE profession_id_seq OWNED BY profession.id;


--
-- TOC entry 177 (class 1259 OID 34688)
-- Name: profession_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE profession_services (
    profession_id integer NOT NULL,
    services_id integer NOT NULL
);


--
-- TOC entry 174 (class 1259 OID 34666)
-- Name: service; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE service (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


--
-- TOC entry 173 (class 1259 OID 34664)
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2090 (class 0 OID 0)
-- Dependencies: 173
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE service_id_seq OWNED BY service.id;


--
-- TOC entry 183 (class 1259 OID 34721)
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "user" (
    id integer NOT NULL,
    name text NOT NULL,
    "displayName" text,
    email text NOT NULL,
    "emailVerified" boolean DEFAULT false,
    username text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone,
    status_id integer NOT NULL,
    type_id integer NOT NULL
);


--
-- TOC entry 182 (class 1259 OID 34719)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2091 (class 0 OID 0)
-- Dependencies: 182
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 184 (class 1259 OID 34733)
-- Name: user_professions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_professions (
    user_id integer NOT NULL,
    professions_id integer NOT NULL
);


--
-- TOC entry 185 (class 1259 OID 34740)
-- Name: user_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_services (
    user_id integer NOT NULL,
    services_id integer NOT NULL
);


--
-- TOC entry 181 (class 1259 OID 34709)
-- Name: user_status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_status (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


--
-- TOC entry 180 (class 1259 OID 34707)
-- Name: user_status_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2092 (class 0 OID 0)
-- Dependencies: 180
-- Name: user_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_status_id_seq OWNED BY user_status.id;


--
-- TOC entry 179 (class 1259 OID 34697)
-- Name: user_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_type (
    id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone
);


--
-- TOC entry 178 (class 1259 OID 34695)
-- Name: user_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2093 (class 0 OID 0)
-- Dependencies: 178
-- Name: user_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_type_id_seq OWNED BY user_type.id;


--
-- TOC entry 1927 (class 2604 OID 34681)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY profession ALTER COLUMN id SET DEFAULT nextval('profession_id_seq'::regclass);


--
-- TOC entry 1926 (class 2604 OID 34669)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY service ALTER COLUMN id SET DEFAULT nextval('service_id_seq'::regclass);


--
-- TOC entry 1930 (class 2604 OID 34724)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1929 (class 2604 OID 34712)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_status ALTER COLUMN id SET DEFAULT nextval('user_status_id_seq'::regclass);


--
-- TOC entry 1928 (class 2604 OID 34700)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_type ALTER COLUMN id SET DEFAULT nextval('user_type_id_seq'::regclass);


--
-- TOC entry 2072 (class 0 OID 34678)
-- Dependencies: 176
-- Data for Name: profession; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2094 (class 0 OID 0)
-- Dependencies: 175
-- Name: profession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('profession_id_seq', 1, false);


--
-- TOC entry 2073 (class 0 OID 34688)
-- Dependencies: 177
-- Data for Name: profession_services; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2070 (class 0 OID 34666)
-- Dependencies: 174
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2095 (class 0 OID 0)
-- Dependencies: 173
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('service_id_seq', 1, false);


--
-- TOC entry 2079 (class 0 OID 34721)
-- Dependencies: 183
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2096 (class 0 OID 0)
-- Dependencies: 182
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_id_seq', 1, false);


--
-- TOC entry 2080 (class 0 OID 34733)
-- Dependencies: 184
-- Data for Name: user_professions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2081 (class 0 OID 34740)
-- Dependencies: 185
-- Data for Name: user_services; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2077 (class 0 OID 34709)
-- Dependencies: 181
-- Data for Name: user_status; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2097 (class 0 OID 0)
-- Dependencies: 180
-- Name: user_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_status_id_seq', 1, false);


--
-- TOC entry 2075 (class 0 OID 34697)
-- Dependencies: 179
-- Data for Name: user_type; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2098 (class 0 OID 0)
-- Dependencies: 178
-- Name: user_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_type_id_seq', 1, false);


--
-- TOC entry 1937 (class 2606 OID 34686)
-- Name: profession_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profession
    ADD CONSTRAINT profession_pkey PRIMARY KEY (id);


--
-- TOC entry 1939 (class 2606 OID 34692)
-- Name: profession_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profession_services
    ADD CONSTRAINT profession_services_pkey PRIMARY KEY (profession_id, services_id);


--
-- TOC entry 1934 (class 2606 OID 34674)
-- Name: service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- TOC entry 1950 (class 2606 OID 34730)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 1953 (class 2606 OID 34737)
-- Name: user_professions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_professions
    ADD CONSTRAINT user_professions_pkey PRIMARY KEY (user_id, professions_id);


--
-- TOC entry 1957 (class 2606 OID 34744)
-- Name: user_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_services
    ADD CONSTRAINT user_services_pkey PRIMARY KEY (user_id, services_id);


--
-- TOC entry 1947 (class 2606 OID 34717)
-- Name: user_status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_status
    ADD CONSTRAINT user_status_pkey PRIMARY KEY (id);


--
-- TOC entry 1944 (class 2606 OID 34705)
-- Name: user_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);


--
-- TOC entry 1935 (class 1259 OID 34687)
-- Name: profession_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX profession_description_unique ON profession USING btree (description);


--
-- TOC entry 1940 (class 1259 OID 34693)
-- Name: profession_services_profession_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX profession_services_profession_id_index ON profession_services USING btree (profession_id);


--
-- TOC entry 1941 (class 1259 OID 34694)
-- Name: profession_services_services_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX profession_services_services_id_index ON profession_services USING btree (services_id);


--
-- TOC entry 1932 (class 1259 OID 34675)
-- Name: service_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX service_description_unique ON service USING btree (description);


--
-- TOC entry 1948 (class 1259 OID 34731)
-- Name: user_email_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_email_unique ON "user" USING btree (email);


--
-- TOC entry 1954 (class 1259 OID 34739)
-- Name: user_professions_professions_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_professions_professions_id_index ON user_professions USING btree (professions_id);


--
-- TOC entry 1955 (class 1259 OID 34738)
-- Name: user_professions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_professions_user_id_index ON user_professions USING btree (user_id);


--
-- TOC entry 1958 (class 1259 OID 34746)
-- Name: user_services_services_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_services_services_id_index ON user_services USING btree (services_id);


--
-- TOC entry 1959 (class 1259 OID 34745)
-- Name: user_services_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_services_user_id_index ON user_services USING btree (user_id);


--
-- TOC entry 1945 (class 1259 OID 34718)
-- Name: user_status_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_status_description_unique ON user_status USING btree (description);


--
-- TOC entry 1942 (class 1259 OID 34706)
-- Name: user_type_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_type_description_unique ON user_type USING btree (description);


--
-- TOC entry 1951 (class 1259 OID 34732)
-- Name: user_username_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_username_unique ON "user" USING btree (username);


-- Completed on 2016-09-01 01:40:33 BRT

--
-- PostgreSQL database dump complete
--

