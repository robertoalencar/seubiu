--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.9
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-08-21 22:57:28 BRT

--
-- TOC entry 176 (class 1259 OID 17559)
-- Name: auth_provider; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE auth_provider (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE auth_provider OWNER TO seubiu;

--
-- TOC entry 175 (class 1259 OID 17557)
-- Name: auth_provider_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE auth_provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_provider_id_seq OWNER TO seubiu;

--
-- TOC entry 2199 (class 0 OID 0)
-- Dependencies: 175
-- Name: auth_provider_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE auth_provider_id_seq OWNED BY auth_provider.id;


--
-- TOC entry 199 (class 1259 OID 17700)
-- Name: comment; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE comment (
    id integer NOT NULL,
    content text NOT NULL,
    author_id integer NOT NULL
);


ALTER TABLE comment OWNER TO seubiu;

--
-- TOC entry 198 (class 1259 OID 17698)
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comment_id_seq OWNER TO seubiu;

--
-- TOC entry 2200 (class 0 OID 0)
-- Dependencies: 198
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE comment_id_seq OWNED BY comment.id;


--
-- TOC entry 178 (class 1259 OID 17571)
-- Name: device_type; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE device_type (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE device_type OWNER TO seubiu;

--
-- TOC entry 177 (class 1259 OID 17569)
-- Name: device_type_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE device_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE device_type_id_seq OWNER TO seubiu;

--
-- TOC entry 2201 (class 0 OID 0)
-- Dependencies: 177
-- Name: device_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE device_type_id_seq OWNED BY device_type.id;


--
-- TOC entry 180 (class 1259 OID 17583)
-- Name: installation; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE installation (
    id integer NOT NULL,
    "deviceToken" text NOT NULL,
    "appVersion" text NOT NULL,
    devicetype_id integer NOT NULL
);


ALTER TABLE installation OWNER TO seubiu;

--
-- TOC entry 179 (class 1259 OID 17581)
-- Name: installation_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE installation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE installation_id_seq OWNER TO seubiu;

--
-- TOC entry 2202 (class 0 OID 0)
-- Dependencies: 179
-- Name: installation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE installation_id_seq OWNED BY installation.id;


--
-- TOC entry 184 (class 1259 OID 17607)
-- Name: profession; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE profession (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE profession OWNER TO seubiu;

--
-- TOC entry 183 (class 1259 OID 17605)
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
-- TOC entry 2203 (class 0 OID 0)
-- Dependencies: 183
-- Name: profession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE profession_id_seq OWNED BY profession.id;


--
-- TOC entry 185 (class 1259 OID 17617)
-- Name: profession_services; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE profession_services (
    profession_id integer NOT NULL,
    services_id integer NOT NULL
);


ALTER TABLE profession_services OWNER TO seubiu;

--
-- TOC entry 203 (class 1259 OID 17723)
-- Name: request; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE request (
    id integer NOT NULL,
    description text,
    status_id integer NOT NULL,
    owner_id integer NOT NULL,
    profession_id integer NOT NULL,
    professional_id integer
);


ALTER TABLE request OWNER TO seubiu;

--
-- TOC entry 205 (class 1259 OID 17739)
-- Name: request_candidates; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE request_candidates (
    request_id integer NOT NULL,
    candidates_id integer NOT NULL
);


ALTER TABLE request_candidates OWNER TO seubiu;

--
-- TOC entry 206 (class 1259 OID 17746)
-- Name: request_comments; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE request_comments (
    request_id integer NOT NULL,
    comments_id integer NOT NULL
);


ALTER TABLE request_comments OWNER TO seubiu;

--
-- TOC entry 202 (class 1259 OID 17721)
-- Name: request_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE request_id_seq OWNER TO seubiu;

--
-- TOC entry 2204 (class 0 OID 0)
-- Dependencies: 202
-- Name: request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE request_id_seq OWNED BY request.id;


--
-- TOC entry 204 (class 1259 OID 17732)
-- Name: request_services; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE request_services (
    request_id integer NOT NULL,
    services_id integer NOT NULL
);


ALTER TABLE request_services OWNER TO seubiu;

--
-- TOC entry 201 (class 1259 OID 17711)
-- Name: request_status; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE request_status (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE request_status OWNER TO seubiu;

--
-- TOC entry 200 (class 1259 OID 17709)
-- Name: request_status_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE request_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE request_status_id_seq OWNER TO seubiu;

--
-- TOC entry 2205 (class 0 OID 0)
-- Dependencies: 200
-- Name: request_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE request_status_id_seq OWNED BY request_status.id;


--
-- TOC entry 182 (class 1259 OID 17595)
-- Name: service; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE service (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE service OWNER TO seubiu;

--
-- TOC entry 181 (class 1259 OID 17593)
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
-- TOC entry 2206 (class 0 OID 0)
-- Dependencies: 181
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE service_id_seq OWNED BY service.id;


--
-- TOC entry 197 (class 1259 OID 17688)
-- Name: session; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE session (
    id integer NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp without time zone,
    user_id integer NOT NULL,
    installation_id integer NOT NULL
);


ALTER TABLE session OWNER TO seubiu;

--
-- TOC entry 196 (class 1259 OID 17686)
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE session_id_seq OWNER TO seubiu;

--
-- TOC entry 2207 (class 0 OID 0)
-- Dependencies: 196
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE session_id_seq OWNED BY session.id;


--
-- TOC entry 193 (class 1259 OID 17661)
-- Name: user; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE "user" (
    id integer NOT NULL,
    name text NOT NULL,
    "displayName" text,
    email text NOT NULL,
    "emailVerified" boolean DEFAULT false,
    password text NOT NULL,
    "authData" text,
    status_id integer NOT NULL,
    type_id integer NOT NULL,
    authprovider_id integer NOT NULL
);


ALTER TABLE "user" OWNER TO seubiu;

--
-- TOC entry 192 (class 1259 OID 17659)
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
-- TOC entry 2208 (class 0 OID 0)
-- Dependencies: 192
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 194 (class 1259 OID 17672)
-- Name: user_professions; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_professions (
    user_id integer NOT NULL,
    professions_id integer NOT NULL
);


ALTER TABLE user_professions OWNER TO seubiu;

--
-- TOC entry 187 (class 1259 OID 17626)
-- Name: user_rating; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_rating (
    id integer NOT NULL,
    rate real NOT NULL,
    comment text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE user_rating OWNER TO seubiu;

--
-- TOC entry 186 (class 1259 OID 17624)
-- Name: user_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: seubiu
--

CREATE SEQUENCE user_rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_rating_id_seq OWNER TO seubiu;

--
-- TOC entry 2209 (class 0 OID 0)
-- Dependencies: 186
-- Name: user_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE user_rating_id_seq OWNED BY user_rating.id;


--
-- TOC entry 195 (class 1259 OID 17679)
-- Name: user_services; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_services (
    user_id integer NOT NULL,
    services_id integer NOT NULL
);


ALTER TABLE user_services OWNER TO seubiu;

--
-- TOC entry 191 (class 1259 OID 17649)
-- Name: user_status; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_status (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE user_status OWNER TO seubiu;

--
-- TOC entry 190 (class 1259 OID 17647)
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
-- TOC entry 2210 (class 0 OID 0)
-- Dependencies: 190
-- Name: user_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE user_status_id_seq OWNED BY user_status.id;


--
-- TOC entry 189 (class 1259 OID 17637)
-- Name: user_type; Type: TABLE; Schema: public; Owner: seubiu
--

CREATE TABLE user_type (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE user_type OWNER TO seubiu;

--
-- TOC entry 188 (class 1259 OID 17635)
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
-- TOC entry 2211 (class 0 OID 0)
-- Dependencies: 188
-- Name: user_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seubiu
--

ALTER SEQUENCE user_type_id_seq OWNED BY user_type.id;


--
-- TOC entry 1980 (class 2604 OID 17562)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY auth_provider ALTER COLUMN id SET DEFAULT nextval('auth_provider_id_seq'::regclass);


--
-- TOC entry 1991 (class 2604 OID 17703)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY comment ALTER COLUMN id SET DEFAULT nextval('comment_id_seq'::regclass);


--
-- TOC entry 1981 (class 2604 OID 17574)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY device_type ALTER COLUMN id SET DEFAULT nextval('device_type_id_seq'::regclass);


--
-- TOC entry 1982 (class 2604 OID 17586)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY installation ALTER COLUMN id SET DEFAULT nextval('installation_id_seq'::regclass);


--
-- TOC entry 1984 (class 2604 OID 17610)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY profession ALTER COLUMN id SET DEFAULT nextval('profession_id_seq'::regclass);


--
-- TOC entry 1993 (class 2604 OID 17726)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY request ALTER COLUMN id SET DEFAULT nextval('request_id_seq'::regclass);


--
-- TOC entry 1992 (class 2604 OID 17714)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY request_status ALTER COLUMN id SET DEFAULT nextval('request_status_id_seq'::regclass);


--
-- TOC entry 1983 (class 2604 OID 17598)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY service ALTER COLUMN id SET DEFAULT nextval('service_id_seq'::regclass);


--
-- TOC entry 1990 (class 2604 OID 17691)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY session ALTER COLUMN id SET DEFAULT nextval('session_id_seq'::regclass);


--
-- TOC entry 1988 (class 2604 OID 17664)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1985 (class 2604 OID 17629)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_rating ALTER COLUMN id SET DEFAULT nextval('user_rating_id_seq'::regclass);


--
-- TOC entry 1987 (class 2604 OID 17652)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_status ALTER COLUMN id SET DEFAULT nextval('user_status_id_seq'::regclass);


--
-- TOC entry 1986 (class 2604 OID 17640)
-- Name: id; Type: DEFAULT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_type ALTER COLUMN id SET DEFAULT nextval('user_type_id_seq'::regclass);


--
-- TOC entry 2164 (class 0 OID 17559)
-- Dependencies: 176
-- Data for Name: auth_provider; Type: TABLE DATA; Schema: public; Owner: seubiu
--

INSERT INTO auth_provider (id, description) VALUES (1, 'Database');
INSERT INTO auth_provider (id, description) VALUES (2, 'Google');
INSERT INTO auth_provider (id, description) VALUES (3, 'Facebook');


--
-- TOC entry 2212 (class 0 OID 0)
-- Dependencies: 175
-- Name: auth_provider_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('auth_provider_id_seq', 3, true);


--
-- TOC entry 2187 (class 0 OID 17700)
-- Dependencies: 199
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2213 (class 0 OID 0)
-- Dependencies: 198
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('comment_id_seq', 1, false);


--
-- TOC entry 2166 (class 0 OID 17571)
-- Dependencies: 178
-- Data for Name: device_type; Type: TABLE DATA; Schema: public; Owner: seubiu
--

INSERT INTO device_type (id, description) VALUES (1, 'Android');
INSERT INTO device_type (id, description) VALUES (2, 'IOS');
INSERT INTO device_type (id, description) VALUES (3, 'Browser');


--
-- TOC entry 2214 (class 0 OID 0)
-- Dependencies: 177
-- Name: device_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('device_type_id_seq', 3, true);


--
-- TOC entry 2168 (class 0 OID 17583)
-- Dependencies: 180
-- Data for Name: installation; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2215 (class 0 OID 0)
-- Dependencies: 179
-- Name: installation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('installation_id_seq', 1, false);


--
-- TOC entry 2172 (class 0 OID 17607)
-- Dependencies: 184
-- Data for Name: profession; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2216 (class 0 OID 0)
-- Dependencies: 183
-- Name: profession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('profession_id_seq', 1, false);


--
-- TOC entry 2173 (class 0 OID 17617)
-- Dependencies: 185
-- Data for Name: profession_services; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2191 (class 0 OID 17723)
-- Dependencies: 203
-- Data for Name: request; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2193 (class 0 OID 17739)
-- Dependencies: 205
-- Data for Name: request_candidates; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2194 (class 0 OID 17746)
-- Dependencies: 206
-- Data for Name: request_comments; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2217 (class 0 OID 0)
-- Dependencies: 202
-- Name: request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('request_id_seq', 1, false);


--
-- TOC entry 2192 (class 0 OID 17732)
-- Dependencies: 204
-- Data for Name: request_services; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2189 (class 0 OID 17711)
-- Dependencies: 201
-- Data for Name: request_status; Type: TABLE DATA; Schema: public; Owner: seubiu
--

INSERT INTO request_status (id, description) VALUES (1, 'New');
INSERT INTO request_status (id, description) VALUES (3, 'Cancelled');
INSERT INTO request_status (id, description) VALUES (4, 'Finished');
INSERT INTO request_status (id, description) VALUES (2, 'Matched');


--
-- TOC entry 2218 (class 0 OID 0)
-- Dependencies: 200
-- Name: request_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('request_status_id_seq', 4, true);


--
-- TOC entry 2170 (class 0 OID 17595)
-- Dependencies: 182
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2219 (class 0 OID 0)
-- Dependencies: 181
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('service_id_seq', 1, false);


--
-- TOC entry 2185 (class 0 OID 17688)
-- Dependencies: 197
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2220 (class 0 OID 0)
-- Dependencies: 196
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('session_id_seq', 1, false);


--
-- TOC entry 2181 (class 0 OID 17661)
-- Dependencies: 193
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2221 (class 0 OID 0)
-- Dependencies: 192
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('user_id_seq', 1, false);


--
-- TOC entry 2182 (class 0 OID 17672)
-- Dependencies: 194
-- Data for Name: user_professions; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2175 (class 0 OID 17626)
-- Dependencies: 187
-- Data for Name: user_rating; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2222 (class 0 OID 0)
-- Dependencies: 186
-- Name: user_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('user_rating_id_seq', 1, false);


--
-- TOC entry 2183 (class 0 OID 17679)
-- Dependencies: 195
-- Data for Name: user_services; Type: TABLE DATA; Schema: public; Owner: seubiu
--



--
-- TOC entry 2179 (class 0 OID 17649)
-- Dependencies: 191
-- Data for Name: user_status; Type: TABLE DATA; Schema: public; Owner: seubiu
--

INSERT INTO user_status (id, description) VALUES (1, 'New');
INSERT INTO user_status (id, description) VALUES (2, 'Active');
INSERT INTO user_status (id, description) VALUES (3, 'Disabled');
INSERT INTO user_status (id, description) VALUES (4, 'Deleted');


--
-- TOC entry 2223 (class 0 OID 0)
-- Dependencies: 190
-- Name: user_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('user_status_id_seq', 4, true);


--
-- TOC entry 2177 (class 0 OID 17637)
-- Dependencies: 189
-- Data for Name: user_type; Type: TABLE DATA; Schema: public; Owner: seubiu
--

INSERT INTO user_type (id, description) VALUES (1, 'Admin');
INSERT INTO user_type (id, description) VALUES (2, 'Customer');
INSERT INTO user_type (id, description) VALUES (3, 'Professional');


--
-- TOC entry 2224 (class 0 OID 0)
-- Dependencies: 188
-- Name: user_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seubiu
--

SELECT pg_catalog.setval('user_type_id_seq', 3, true);


--
-- TOC entry 1996 (class 2606 OID 17567)
-- Name: auth_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY auth_provider
    ADD CONSTRAINT auth_provider_pkey PRIMARY KEY (id);


--
-- TOC entry 2036 (class 2606 OID 17708)
-- Name: comment_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- TOC entry 1999 (class 2606 OID 17579)
-- Name: device_type_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY device_type
    ADD CONSTRAINT device_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2002 (class 2606 OID 17591)
-- Name: installation_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY installation
    ADD CONSTRAINT installation_pkey PRIMARY KEY (id);


--
-- TOC entry 2008 (class 2606 OID 17615)
-- Name: profession_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY profession
    ADD CONSTRAINT profession_pkey PRIMARY KEY (id);


--
-- TOC entry 2010 (class 2606 OID 17621)
-- Name: profession_services_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY profession_services
    ADD CONSTRAINT profession_services_pkey PRIMARY KEY (profession_id, services_id);


--
-- TOC entry 2048 (class 2606 OID 17743)
-- Name: request_candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY request_candidates
    ADD CONSTRAINT request_candidates_pkey PRIMARY KEY (request_id, candidates_id);


--
-- TOC entry 2052 (class 2606 OID 17750)
-- Name: request_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY request_comments
    ADD CONSTRAINT request_comments_pkey PRIMARY KEY (request_id, comments_id);


--
-- TOC entry 2041 (class 2606 OID 17731)
-- Name: request_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY request
    ADD CONSTRAINT request_pkey PRIMARY KEY (id);


--
-- TOC entry 2043 (class 2606 OID 17736)
-- Name: request_services_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY request_services
    ADD CONSTRAINT request_services_pkey PRIMARY KEY (request_id, services_id);


--
-- TOC entry 2039 (class 2606 OID 17719)
-- Name: request_status_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY request_status
    ADD CONSTRAINT request_status_pkey PRIMARY KEY (id);


--
-- TOC entry 2005 (class 2606 OID 17603)
-- Name: service_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- TOC entry 2033 (class 2606 OID 17696)
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- TOC entry 2023 (class 2606 OID 17670)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2025 (class 2606 OID 17676)
-- Name: user_professions_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_professions
    ADD CONSTRAINT user_professions_pkey PRIMARY KEY (user_id, professions_id);


--
-- TOC entry 2014 (class 2606 OID 17634)
-- Name: user_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_rating
    ADD CONSTRAINT user_rating_pkey PRIMARY KEY (id);


--
-- TOC entry 2029 (class 2606 OID 17683)
-- Name: user_services_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_services
    ADD CONSTRAINT user_services_pkey PRIMARY KEY (user_id, services_id);


--
-- TOC entry 2020 (class 2606 OID 17657)
-- Name: user_status_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_status
    ADD CONSTRAINT user_status_pkey PRIMARY KEY (id);


--
-- TOC entry 2017 (class 2606 OID 17645)
-- Name: user_type_pkey; Type: CONSTRAINT; Schema: public; Owner: seubiu
--

ALTER TABLE ONLY user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);


--
-- TOC entry 1994 (class 1259 OID 17568)
-- Name: auth_provider_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX auth_provider_description_unique ON auth_provider USING btree (description);


--
-- TOC entry 1997 (class 1259 OID 17580)
-- Name: device_type_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX device_type_description_unique ON device_type USING btree (description);


--
-- TOC entry 2000 (class 1259 OID 17592)
-- Name: installation_deviceToken_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX "installation_deviceToken_unique" ON installation USING btree ("deviceToken");


--
-- TOC entry 2006 (class 1259 OID 17616)
-- Name: profession_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX profession_description_unique ON profession USING btree (description);


--
-- TOC entry 2011 (class 1259 OID 17622)
-- Name: profession_services_profession_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX profession_services_profession_id_index ON profession_services USING btree (profession_id);


--
-- TOC entry 2012 (class 1259 OID 17623)
-- Name: profession_services_services_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX profession_services_services_id_index ON profession_services USING btree (services_id);


--
-- TOC entry 2046 (class 1259 OID 17745)
-- Name: request_candidates_candidates_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX request_candidates_candidates_id_index ON request_candidates USING btree (candidates_id);


--
-- TOC entry 2049 (class 1259 OID 17744)
-- Name: request_candidates_request_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX request_candidates_request_id_index ON request_candidates USING btree (request_id);


--
-- TOC entry 2050 (class 1259 OID 17752)
-- Name: request_comments_comments_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX request_comments_comments_id_index ON request_comments USING btree (comments_id);


--
-- TOC entry 2053 (class 1259 OID 17751)
-- Name: request_comments_request_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX request_comments_request_id_index ON request_comments USING btree (request_id);


--
-- TOC entry 2044 (class 1259 OID 17737)
-- Name: request_services_request_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX request_services_request_id_index ON request_services USING btree (request_id);


--
-- TOC entry 2045 (class 1259 OID 17738)
-- Name: request_services_services_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX request_services_services_id_index ON request_services USING btree (services_id);


--
-- TOC entry 2037 (class 1259 OID 17720)
-- Name: request_status_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX request_status_description_unique ON request_status USING btree (description);


--
-- TOC entry 2003 (class 1259 OID 17604)
-- Name: service_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX service_description_unique ON service USING btree (description);


--
-- TOC entry 2034 (class 1259 OID 17697)
-- Name: session_token_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX session_token_unique ON session USING btree (token);


--
-- TOC entry 2021 (class 1259 OID 17671)
-- Name: user_email_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX user_email_unique ON "user" USING btree (email);


--
-- TOC entry 2026 (class 1259 OID 17678)
-- Name: user_professions_professions_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_professions_professions_id_index ON user_professions USING btree (professions_id);


--
-- TOC entry 2027 (class 1259 OID 17677)
-- Name: user_professions_user_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_professions_user_id_index ON user_professions USING btree (user_id);


--
-- TOC entry 2030 (class 1259 OID 17685)
-- Name: user_services_services_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_services_services_id_index ON user_services USING btree (services_id);


--
-- TOC entry 2031 (class 1259 OID 17684)
-- Name: user_services_user_id_index; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE INDEX user_services_user_id_index ON user_services USING btree (user_id);


--
-- TOC entry 2018 (class 1259 OID 17658)
-- Name: user_status_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX user_status_description_unique ON user_status USING btree (description);


--
-- TOC entry 2015 (class 1259 OID 17646)
-- Name: user_type_description_unique; Type: INDEX; Schema: public; Owner: seubiu
--

CREATE UNIQUE INDEX user_type_description_unique ON user_type USING btree (description);


-- Completed on 2016-08-21 22:57:37 BRT

--
-- PostgreSQL database dump complete
--

