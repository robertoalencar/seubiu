--
-- Name: device_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE device_type (
    id integer NOT NULL,
    description text NOT NULL
);


--
-- Name: device_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE device_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: device_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE device_type_id_seq OWNED BY device_type.id;


--
-- Name: installation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE installation (
    id integer NOT NULL,
    "deviceToken" text NOT NULL,
    "appVersion" text NOT NULL,
    created_at timestamp without time zone,
    modified_at timestamp without time zone,
    devicetype_id integer NOT NULL
);


--
-- Name: installation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE installation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: installation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE installation_id_seq OWNED BY installation.id;


--
-- Name: profession; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE profession (
    id integer NOT NULL,
    description text NOT NULL,
    active boolean DEFAULT false
);


--
-- Name: profession_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE profession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: profession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE profession_id_seq OWNED BY profession.id;


--
-- Name: service; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE service (
    id integer NOT NULL,
    description text NOT NULL,
    active boolean DEFAULT false,
    profession_id integer NOT NULL
);


--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE service_id_seq OWNED BY service.id;


--
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
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: user_professions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_professions (
    user_id integer NOT NULL,
    professions_id integer NOT NULL
);


--
-- Name: user_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_services (
    user_id integer NOT NULL,
    services_id integer NOT NULL
);


--
-- Name: user_status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_status (
    id integer NOT NULL,
    description text NOT NULL
);


--
-- Name: user_status_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_status_id_seq OWNED BY user_status.id;


--
-- Name: user_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_type (
    id integer NOT NULL,
    description text NOT NULL
);


--
-- Name: user_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_type_id_seq OWNED BY user_type.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY device_type ALTER COLUMN id SET DEFAULT nextval('device_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY installation ALTER COLUMN id SET DEFAULT nextval('installation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY profession ALTER COLUMN id SET DEFAULT nextval('profession_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY service ALTER COLUMN id SET DEFAULT nextval('service_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_status ALTER COLUMN id SET DEFAULT nextval('user_status_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_type ALTER COLUMN id SET DEFAULT nextval('user_type_id_seq'::regclass);


--
-- Data for Name: device_type; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: device_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('device_type_id_seq', 1, false);


--
-- Data for Name: installation; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: installation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('installation_id_seq', 1, false);


--
-- Data for Name: profession; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: profession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('profession_id_seq', 1, false);


--
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('service_id_seq', 1, false);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_id_seq', 1, false);


--
-- Data for Name: user_professions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: user_services; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: user_status; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: user_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_status_id_seq', 1, false);


--
-- Data for Name: user_type; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: user_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_type_id_seq', 1, false);


--
-- Name: device_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY device_type
    ADD CONSTRAINT device_type_pkey PRIMARY KEY (id);


--
-- Name: installation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY installation
    ADD CONSTRAINT installation_pkey PRIMARY KEY (id);


--
-- Name: profession_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY profession
    ADD CONSTRAINT profession_pkey PRIMARY KEY (id);


--
-- Name: service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_professions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_professions
    ADD CONSTRAINT user_professions_pkey PRIMARY KEY (user_id, professions_id);


--
-- Name: user_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_services
    ADD CONSTRAINT user_services_pkey PRIMARY KEY (user_id, services_id);


--
-- Name: user_status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_status
    ADD CONSTRAINT user_status_pkey PRIMARY KEY (id);


--
-- Name: user_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);


--
-- Name: device_type_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX device_type_description_unique ON device_type USING btree (description);


--
-- Name: installation_deviceToken_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "installation_deviceToken_unique" ON installation USING btree ("deviceToken");


--
-- Name: profession_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX profession_description_unique ON profession USING btree (description);


--
-- Name: service_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX service_description_unique ON service USING btree (description);


--
-- Name: user_email_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_email_unique ON "user" USING btree (email);


--
-- Name: user_professions_professions_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_professions_professions_id_index ON user_professions USING btree (professions_id);


--
-- Name: user_professions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_professions_user_id_index ON user_professions USING btree (user_id);


--
-- Name: user_services_services_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_services_services_id_index ON user_services USING btree (services_id);


--
-- Name: user_services_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_services_user_id_index ON user_services USING btree (user_id);


--
-- Name: user_status_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_status_description_unique ON user_status USING btree (description);


--
-- Name: user_type_description_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_type_description_unique ON user_type USING btree (description);


--
-- Name: user_username_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_username_unique ON "user" USING btree (username);


