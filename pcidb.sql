-- ============================================================
-- MEDIKIOSK DATABASE SCHEMA
-- PostgreSQL
-- ============================================================

-- ============================================================
-- 1. DOCTORS
-- ============================================================

CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. PATIENTS
-- ============================================================

CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(30),
    phone VARCHAR(20),
    email VARCHAR(200),
    blood_group VARCHAR(5),
    address TEXT,
    abha_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. APPOINTMENTS
-- ============================================================

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    doctor_id INTEGER
        REFERENCES doctors(doctor_id)
        ON DELETE SET NULL,

    appointment_date TIMESTAMP NOT NULL,
    department VARCHAR(100),
    reason TEXT,

    status VARCHAR(30) NOT NULL DEFAULT 'scheduled',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 4. PATIENT SESSIONS
-- ============================================================

CREATE TABLE patient_sessions (
    session_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    appointment_id INTEGER
        REFERENCES appointments(appointment_id)
        ON DELETE SET NULL,

    language VARCHAR(50) NOT NULL DEFAULT 'English',

    input_mode VARCHAR(30) NOT NULL DEFAULT 'voice',

    session_status VARCHAR(30) NOT NULL DEFAULT 'in_progress',

    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    completed_at TIMESTAMP,

    red_flag_detected BOOLEAN NOT NULL DEFAULT FALSE
);


-- ============================================================
-- 5. CONSENTS
-- ============================================================

CREATE TABLE consents (
    consent_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    session_id INTEGER
        REFERENCES patient_sessions(session_id)
        ON DELETE CASCADE,

    consent_type VARCHAR(100) NOT NULL,

    granted BOOLEAN NOT NULL,

    consent_version VARCHAR(30) NOT NULL DEFAULT '1.0',

    explanation_language VARCHAR(50) NOT NULL DEFAULT 'English',

    granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    revoked_at TIMESTAMP
);


-- ============================================================
-- 6. HISTORY RESPONSES
-- ============================================================

CREATE TABLE history_responses (
    response_id SERIAL PRIMARY KEY,

    session_id INTEGER NOT NULL
        REFERENCES patient_sessions(session_id)
        ON DELETE CASCADE,

    section VARCHAR(50) NOT NULL,

    question_key VARCHAR(100) NOT NULL,

    question_text TEXT NOT NULL,

    answer_text TEXT,

    answer_source VARCHAR(30) NOT NULL DEFAULT 'voice',

    confidence NUMERIC(5,4),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 7. SYMPTOMS
-- ============================================================

CREATE TABLE symptoms (
    symptom_id SERIAL PRIMARY KEY,

    session_id INTEGER NOT NULL
        REFERENCES patient_sessions(session_id)
        ON DELETE CASCADE,

    symptom_name VARCHAR(150) NOT NULL,

    onset VARCHAR(100),

    duration VARCHAR(100),

    severity VARCHAR(30),

    location VARCHAR(150),

    description TEXT,

    red_flag BOOLEAN NOT NULL DEFAULT FALSE
);


-- ============================================================
-- 8. RED FLAGS
-- ============================================================

CREATE TABLE red_flags (
    red_flag_id SERIAL PRIMARY KEY,

    session_id INTEGER NOT NULL
        REFERENCES patient_sessions(session_id)
        ON DELETE CASCADE,

    flag_type VARCHAR(100) NOT NULL,

    description TEXT NOT NULL,

    severity VARCHAR(30) NOT NULL,

    detected_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    triage_status VARCHAR(30) NOT NULL DEFAULT 'pending'
);


-- ============================================================
-- 9. AYUSH ASSESSMENTS
-- ============================================================

CREATE TABLE ayush_assessments (
    ayush_id SERIAL PRIMARY KEY,

    session_id INTEGER NOT NULL
        REFERENCES patient_sessions(session_id)
        ON DELETE CASCADE,

    prakriti TEXT,
    vikriti TEXT,
    sara TEXT,
    samhanana TEXT,
    pramana TEXT,
    satmya TEXT,
    sattva TEXT,
    ahara_shakti TEXT,
    vyayama_shakti TEXT,
    vaya TEXT,

    ahara_vihara TEXT,
    nidana TEXT,
    samprapti TEXT
);


-- ============================================================
-- 10. DIAGNOSES
-- ============================================================

CREATE TABLE diagnoses (
    diagnosis_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    diagnosed_by INTEGER
        REFERENCES doctors(doctor_id)
        ON DELETE SET NULL,

    diagnosis_name VARCHAR(200) NOT NULL,

    diagnosis_code VARCHAR(50),

    diagnosed_date DATE NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'active',

    notes TEXT
);


-- ============================================================
-- 11. ALLERGIES
-- ============================================================

CREATE TABLE allergies (
    allergy_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    allergen VARCHAR(200) NOT NULL,

    reaction VARCHAR(200),

    severity VARCHAR(30)
);


-- ============================================================
-- 12. MEDICATIONS
-- ============================================================

CREATE TABLE medications (
    medication_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    prescribed_by INTEGER
        REFERENCES doctors(doctor_id)
        ON DELETE SET NULL,

    medicine_name VARCHAR(200) NOT NULL,

    dosage VARCHAR(100),

    frequency VARCHAR(100),

    start_date DATE,

    end_date DATE,

    status VARCHAR(30) NOT NULL DEFAULT 'active',

    instructions TEXT
);


-- ============================================================
-- 13. VITALS
-- ============================================================

CREATE TABLE vitals (
    vital_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    heart_rate INTEGER,

    systolic_bp INTEGER,

    diastolic_bp INTEGER,

    temperature NUMERIC(4,1),

    spo2 NUMERIC(5,2),

    weight_kg NUMERIC(6,2),

    height_cm NUMERIC(6,2)
);


-- ============================================================
-- 14. LAB RESULTS
-- ============================================================

CREATE TABLE lab_results (
    lab_result_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    test_name VARCHAR(150) NOT NULL,

    test_date DATE NOT NULL,

    value VARCHAR(100),

    unit VARCHAR(50),

    reference_range VARCHAR(100),

    status VARCHAR(30),

    notes TEXT
);


-- ============================================================
-- 15. MEDICAL DOCUMENTS
-- ============================================================

CREATE TABLE medical_documents (
    document_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    session_id INTEGER
        REFERENCES patient_sessions(session_id)
        ON DELETE SET NULL,

    document_type VARCHAR(100) NOT NULL,

    document_name VARCHAR(255) NOT NULL,

    file_path TEXT,

    document_date DATE,

    ocr_status VARCHAR(30) NOT NULL DEFAULT 'pending',

    ocr_text TEXT,

    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 16. DOCUMENT EXTRACTIONS
-- ============================================================

CREATE TABLE document_extractions (
    extraction_id SERIAL PRIMARY KEY,

    document_id INTEGER NOT NULL
        REFERENCES medical_documents(document_id)
        ON DELETE CASCADE,

    entity_type VARCHAR(50) NOT NULL,

    entity_name VARCHAR(200) NOT NULL,

    entity_value TEXT,

    confidence NUMERIC(5,4),

    page_number INTEGER
);


-- ============================================================
-- 17. CLINICAL TIMELINE
-- ============================================================

CREATE TABLE clinical_timeline (
    timeline_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    event_date TIMESTAMP NOT NULL,

    event_type VARCHAR(50) NOT NULL,

    source_table VARCHAR(100),

    source_id INTEGER,

    title VARCHAR(255) NOT NULL,

    description TEXT
);


-- ============================================================
-- 18. CLINICAL SUMMARIES
-- ============================================================

CREATE TABLE clinical_summaries (
    summary_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    session_id INTEGER
        REFERENCES patient_sessions(session_id)
        ON DELETE SET NULL,

    summary_text TEXT NOT NULL,

    chief_complaint TEXT,

    hpi TEXT,

    past_medical_history TEXT,

    past_surgical_history TEXT,

    drug_history TEXT,

    allergy_history TEXT,

    family_history TEXT,

    personal_history TEXT,

    review_of_systems TEXT,

    prior_investigations TEXT,

    red_flags TEXT,

    generated_by VARCHAR(100) NOT NULL DEFAULT 'MediKiosk AI',

    model_version VARCHAR(100),

    generated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(30) NOT NULL DEFAULT 'draft'
);


-- ============================================================
-- 19. DOCTOR REVIEWS
-- ============================================================

CREATE TABLE doctor_reviews (
    review_id SERIAL PRIMARY KEY,

    summary_id INTEGER NOT NULL
        REFERENCES clinical_summaries(summary_id)
        ON DELETE CASCADE,

    doctor_id INTEGER NOT NULL
        REFERENCES doctors(doctor_id)
        ON DELETE CASCADE,

    action VARCHAR(30) NOT NULL,

    edited_summary TEXT,

    comments TEXT,

    reviewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 20. CLINICAL NOTES
-- ============================================================

CREATE TABLE clinical_notes (
    note_id SERIAL PRIMARY KEY,

    patient_id INTEGER NOT NULL
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    doctor_id INTEGER
        REFERENCES doctors(doctor_id)
        ON DELETE SET NULL,

    appointment_id INTEGER
        REFERENCES appointments(appointment_id)
        ON DELETE SET NULL,

    note TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 21. INDEXES
-- ============================================================

CREATE INDEX idx_patients_abha
    ON patients(abha_id);

CREATE INDEX idx_appointments_patient
    ON appointments(patient_id);

CREATE INDEX idx_appointments_doctor
    ON appointments(doctor_id);

CREATE INDEX idx_sessions_patient
    ON patient_sessions(patient_id);

CREATE INDEX idx_consents_patient
    ON consents(patient_id);

CREATE INDEX idx_history_session
    ON history_responses(session_id);

CREATE INDEX idx_symptoms_session
    ON symptoms(session_id);

CREATE INDEX idx_red_flags_session
    ON red_flags(session_id);

CREATE INDEX idx_diagnoses_patient
    ON diagnoses(patient_id);

CREATE INDEX idx_medications_patient
    ON medications(patient_id);

CREATE INDEX idx_allergies_patient
    ON allergies(patient_id);

CREATE INDEX idx_vitals_patient_date
    ON vitals(patient_id, recorded_at);

CREATE INDEX idx_labs_patient_date
    ON lab_results(patient_id, test_date);

CREATE INDEX idx_documents_patient
    ON medical_documents(patient_id);

CREATE INDEX idx_extractions_document
    ON document_extractions(document_id);

CREATE INDEX idx_timeline_patient_date
    ON clinical_timeline(patient_id, event_date);

CREATE INDEX idx_summaries_patient
    ON clinical_summaries(patient_id);

CREATE INDEX idx_notes_patient
    ON clinical_notes(patient_id);


-- ============================================================
-- PCIDB SEED DATA
-- ============================================================


-- ============================================================
-- 0. REMOVE THE TWO TEST RECORDS
-- ============================================================

DELETE FROM doctors
WHERE email = 'test@example.com';

DELETE FROM patients
WHERE email = 'testpatient@example.com';


-- ============================================================
-- 1. DOCTORS
-- ============================================================

INSERT INTO doctors
(name, specialization, department, email)
VALUES
('Dr. Arjun Mehta', 'Cardiology', 'Cardiology', 'arjun.mehta@example.com'),
('Dr. Priya Sharma', 'Endocrinology', 'Endocrinology', 'priya.sharma@example.com'),
('Dr. Rahul Kulkarni', 'General Medicine', 'General Medicine', 'rahul.kulkarni@example.com'),
('Dr. Neha Patil', 'Neurology', 'Neurology', 'neha.patil@example.com'),
('Dr. Vikram Desai', 'Orthopedics', 'Orthopedics', 'vikram.desai@example.com'),
('Dr. Anjali Shah', 'Pulmonology', 'Pulmonology', 'anjali.shah@example.com'),
('Dr. Sameer Joshi', 'Gastroenterology', 'Gastroenterology', 'sameer.joshi@example.com'),
('Dr. Kavita Gupta', 'Dermatology', 'Dermatology', 'kavita.gupta@example.com'),
('Dr. Rakesh Nair', 'Oncology', 'Oncology', 'rakesh.nair@example.com'),
('Dr. Sneha Rao', 'Gynecology', 'Gynecology', 'sneha.rao@example.com'),
('Dr. Amit Verma', 'Urology', 'Urology', 'amit.verma@example.com'),
('Dr. Pooja Iyer', 'Pediatrics', 'Pediatrics', 'pooja.iyer@example.com'),
('Dr. Nikhil Bansal', 'Ophthalmology', 'Ophthalmology', 'nikhil.bansal@example.com'),
('Dr. Manisha Kapoor', 'Psychiatry', 'Psychiatry', 'manisha.kapoor@example.com'),
('Dr. Saurabh Singh', 'ENT', 'ENT', 'saurabh.singh@example.com'),
('Dr. Ritu Malhotra', 'Rheumatology', 'Rheumatology', 'ritu.malhotra@example.com'),
('Dr. Kunal Agarwal', 'Nephrology', 'Nephrology', 'kunal.agarwal@example.com'),
('Dr. Meera Krishnan', 'Hematology', 'Hematology', 'meera.krishnan@example.com'),
('Dr. Varun Chawla', 'General Surgery', 'General Surgery', 'varun.chawla@example.com'),
('Dr. Ayesha Khan', 'Radiology', 'Radiology', 'ayesha.khan@example.com');


-- ============================================================
-- 2. PATIENTS
-- ============================================================

INSERT INTO patients
(first_name, last_name, date_of_birth, gender,
 phone, email, blood_group, address, abha_id)

SELECT

    (ARRAY[
        'Aarav', 'Rohan', 'Arjun', 'Vivaan', 'Kabir',
        'Aditya', 'Rahul', 'Karan', 'Ishaan', 'Dev',
        'Ananya', 'Isha', 'Meera', 'Aditi', 'Sneha',
        'Tanya', 'Priya', 'Kavya', 'Riya', 'Diya'
    ])[floor(random() * 20 + 1)],

    (ARRAY[
        'Sharma', 'Patel', 'Mehta', 'Joshi', 'Kulkarni',
        'Desai', 'Patil', 'Shah', 'Kumar', 'Gupta'
    ])[floor(random() * 10 + 1)],

    DATE '1960-01-01'
        + (random() * 16000)::integer,

    (ARRAY[
        'Male', 'Female'
    ])[floor(random() * 2 + 1)],

    '9' || LPAD(
        floor(random() * 100000000)::bigint::text,
        9,
        '0'
    ),

    'patient' || g || '@example.com',

    (ARRAY[
        'A+', 'A-', 'B+', 'B-',
        'AB+', 'AB-', 'O+', 'O-'
    ])[floor(random() * 8 + 1)],

    (ARRAY[
        'Pune', 'Mumbai', 'Nashik', 'Nagpur',
        'Bengaluru', 'Hyderabad', 'Delhi', 'Chennai'
    ])[floor(random() * 8 + 1)],

    'ABHA' || LPAD(g::text, 10, '0')

FROM generate_series(1, 100) AS g;


-- ============================================================
-- 3. APPOINTMENTS
-- ============================================================

INSERT INTO appointments
(patient_id, doctor_id, appointment_date,
 department, reason, status)

SELECT

    (
        SELECT patient_id
        FROM patients
        ORDER BY patient_id
        LIMIT 1 OFFSET ((g - 1) % 100)
    ),

    (
        SELECT doctor_id
        FROM doctors
        ORDER BY doctor_id
        LIMIT 1 OFFSET ((g - 1) % 20)
    ),

    CURRENT_TIMESTAMP
        - (random() * INTERVAL '730 days'),

    (ARRAY[
        'Cardiology',
        'Endocrinology',
        'General Medicine',
        'Neurology',
        'Orthopedics',
        'Pulmonology',
        'Gastroenterology',
        'Dermatology',
        'Oncology',
        'Gynecology',
        'Urology',
        'Pediatrics',
        'Ophthalmology',
        'Psychiatry',
        'ENT',
        'Rheumatology',
        'Nephrology',
        'Hematology',
        'General Surgery',
        'Radiology'
    ])[floor(random() * 20 + 1)],

    (ARRAY[
        'Routine checkup',
        'Follow-up consultation',
        'Headache',
        'Fever',
        'Abdominal pain',
        'Blood pressure review',
        'Diabetes follow-up',
        'Back pain',
        'Respiratory symptoms',
        'Lab review'
    ])[floor(random() * 10 + 1)],

    (ARRAY[
        'completed',
        'completed',
        'completed',
        'scheduled',
        'cancelled'
    ])[floor(random() * 5 + 1)]

FROM generate_series(1, 300) AS g;


-- ============================================================
-- 4. PATIENT SESSIONS
-- ============================================================

INSERT INTO patient_sessions
(patient_id, appointment_id, language,
 input_mode, session_status,
 started_at, completed_at, red_flag_detected)

SELECT
    patient_id,
    appointment_id,

    (ARRAY[
        'English',
        'Hindi',
        'Marathi'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'voice',
        'touch'
    ])[floor(random() * 2 + 1)],

    'completed',

    appointment_date - INTERVAL '20 minutes',

    appointment_date - INTERVAL '5 minutes',

    random() < 0.08

FROM appointments
WHERE status = 'completed';


-- ============================================================
-- 5. CONSENTS
-- ============================================================

INSERT INTO consents
(patient_id, session_id, consent_type,
 granted, consent_version, explanation_language)

SELECT
    patient_id,
    session_id,
    'clinical_history_capture',
    TRUE,
    '1.0',
    language
FROM patient_sessions;


INSERT INTO consents
(patient_id, session_id, consent_type,
 granted, consent_version, explanation_language)

SELECT
    patient_id,
    session_id,
    'ai_summary_generation',
    TRUE,
    '1.0',
    language
FROM patient_sessions;


-- ============================================================
-- 6. HISTORY RESPONSES
-- ============================================================

INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'Chief Complaint',
    'chief_complaint',
    'What is the main problem bringing you to the hospital?',

    (ARRAY[
        'Chest discomfort',
        'Headache',
        'Abdominal pain',
        'Cough',
        'Back pain',
        'Fatigue',
        'Fever',
        'Joint pain',
        'Routine follow-up'
    ])[floor(random() * 9 + 1)],

    'voice',
    0.9500

FROM patient_sessions;


INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'HPI',
    'onset',
    'When did the problem start?',

    (ARRAY[
        'Since yesterday',
        'For 3 days',
        'For 2 weeks',
        'For several months'
    ])[floor(random() * 4 + 1)],

    'voice',
    0.9200

FROM patient_sessions;


INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'Past Medical History',
    'past_history',
    'Do you have any previous medical conditions?',

    (ARRAY[
        'No significant past history',
        'History of hypertension',
        'History of diabetes',
        'History of asthma',
        'History of hyperlipidemia'
    ])[floor(random() * 5 + 1)],

    'voice',
    0.9400

FROM patient_sessions;


INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'Past Surgical History',
    'surgery_history',
    'Have you had any previous surgeries?',

    (ARRAY[
        'No previous surgery',
        'Appendectomy in childhood',
        'Previous orthopedic surgery',
        'Previous abdominal surgery'
    ])[floor(random() * 4 + 1)],

    'voice',
    0.9300

FROM patient_sessions;


INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'Drug History',
    'drug_history',
    'What medicines are you currently taking?',

    (ARRAY[
        'No regular medications',
        'Taking prescribed medication regularly',
        'Occasional over-the-counter medication'
    ])[floor(random() * 3 + 1)],

    'voice',
    0.9100

FROM patient_sessions;


INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'Family History',
    'family_history',
    'Does your family have any significant medical conditions?',

    (ARRAY[
        'No significant family history',
        'Family history of diabetes',
        'Family history of hypertension',
        'Family history of cardiac disease'
    ])[floor(random() * 4 + 1)],

    'voice',
    0.9000

FROM patient_sessions;


INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'Personal History',
    'personal_history',
    'Tell us about your lifestyle and habits.',

    (ARRAY[
        'Non-smoker, occasional exercise',
        'Sedentary lifestyle',
        'Regular exercise'
    ])[floor(random() * 3 + 1)],

    'voice',
    0.8900

FROM patient_sessions;


INSERT INTO history_responses
(session_id, section, question_key,
 question_text, answer_text,
 answer_source, confidence)

SELECT
    session_id,
    'Review of Systems',
    'review_of_systems',
    'Are you experiencing any other significant symptoms?',

    (ARRAY[
        'No other significant symptoms reported',
        'Mild fatigue reported',
        'No respiratory symptoms',
        'No gastrointestinal symptoms'
    ])[floor(random() * 4 + 1)],

    'voice',
    0.9200

FROM patient_sessions;


-- ============================================================
-- 7. SYMPTOMS
-- ============================================================

INSERT INTO symptoms
(session_id, symptom_name, onset,
 duration, severity, location,
 description, red_flag)

SELECT
    session_id,

    (ARRAY[
        'Headache',
        'Chest discomfort',
        'Cough',
        'Abdominal pain',
        'Back pain',
        'Joint pain',
        'Fatigue'
    ])[floor(random() * 7 + 1)],

    (ARRAY[
        'Yesterday',
        '3 days ago',
        '2 weeks ago',
        'Several months ago'
    ])[floor(random() * 4 + 1)],

    (ARRAY[
        '1 day',
        '3 days',
        '2 weeks',
        '1 month'
    ])[floor(random() * 4 + 1)],

    (ARRAY[
        'Mild',
        'Moderate',
        'Severe'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'Chest',
        'Head',
        'Abdomen',
        'Back',
        'Knee',
        'General'
    ])[floor(random() * 6 + 1)],

    'Patient-reported symptom captured during intake.',

    random() < 0.06

FROM patient_sessions;


-- ============================================================
-- 8. RED FLAGS
-- ============================================================

INSERT INTO red_flags
(session_id, flag_type, description,
 severity, triage_status)

SELECT
    session_id,

    (ARRAY[
        'Acute chest pain',
        'Severe breathlessness',
        'Possible stroke symptom'
    ])[floor(random() * 3 + 1)],

    'Potential emergency symptom detected during intake.',

    'High',

    'Escalated'

FROM patient_sessions
WHERE red_flag_detected = TRUE;


-- ============================================================
-- 9. AYUSH ASSESSMENTS
-- ============================================================

INSERT INTO ayush_assessments
(session_id, prakriti, vikriti, sara,
 samhanana, pramana, satmya, sattva,
 ahara_shakti, vyayama_shakti, vaya,
 ahara_vihara, nidana, samprapti)

SELECT
    session_id,

    (ARRAY[
        'Vata',
        'Pitta',
        'Kapha',
        'Vata-Pitta',
        'Pitta-Kapha',
        'Vata-Kapha',
        'Tridosha'
    ])[floor(random() * 7 + 1)],

    (ARRAY[
        'Vata aggravation',
        'Pitta aggravation',
        'Kapha aggravation',
        'Balanced',
        'Mixed dosha imbalance'
    ])[floor(random() * 5 + 1)],

    (ARRAY[
        'Pravara',
        'Madhyama',
        'Avara'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'Strong',
        'Moderate',
        'Lean',
        'Well-built'
    ])[floor(random() * 4 + 1)],

    (ARRAY[
        'Above average',
        'Average',
        'Below average'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'Good',
        'Moderate',
        'Poor'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'Pravara',
        'Madhyama',
        'Avara'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'Strong',
        'Moderate',
        'Low'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'Strong',
        'Moderate',
        'Low'
    ])[floor(random() * 3 + 1)],

    (ARRAY[
        'Bala',
        'Yuva',
        'Madhyama',
        'Vriddha'
    ])[floor(random() * 4 + 1)],

    (ARRAY[
        'Regular meals and adequate sleep',
        'Irregular meals and variable sleep',
        'High intake of processed food',
        'Balanced diet with regular exercise',
        'Sedentary lifestyle with irregular meals'
    ])[floor(random() * 5 + 1)],

    (ARRAY[
        'Dietary imbalance',
        'Irregular daily routine',
        'Stress',
        'Sedentary lifestyle',
        'Seasonal changes',
        'No significant nidana identified'
    ])[floor(random() * 6 + 1)],

    (ARRAY[
        'Early-stage functional imbalance',
        'Dosha accumulation with mild symptoms',
        'Established clinical manifestation',
        'Improving condition',
        'Assessment requires practitioner confirmation'
    ])[floor(random() * 5 + 1)]

FROM patient_sessions;


-- ============================================================
-- 10. DIAGNOSES
-- ============================================================

INSERT INTO diagnoses
(patient_id, diagnosed_by, diagnosis_name,
 diagnosis_code, diagnosed_date, status, notes)

SELECT

    (
        SELECT patient_id
        FROM patients
        ORDER BY patient_id
        LIMIT 1 OFFSET ((g - 1) % 100)
    ),

    (
        SELECT doctor_id
        FROM doctors
        ORDER BY doctor_id
        LIMIT 1 OFFSET ((g - 1) % 20)
    ),

    (ARRAY[
        'Hypertension',
        'Type 2 Diabetes',
        'Asthma',
        'Migraine',
        'Iron Deficiency Anemia',
        'Vitamin D Deficiency',
        'Gastritis',
        'Lower Back Pain',
        'Hyperlipidemia',
        'Seasonal Allergies'
    ])[floor(random() * 10 + 1)],

    'D-' || LPAD(g::text, 4, '0'),

    CURRENT_DATE - (random() * 2500)::integer,

    (ARRAY[
        'active',
        'active',
        'active',
        'resolved'
    ])[floor(random() * 4 + 1)],

    'Synthetic diagnosis record for demonstration purposes.'

FROM generate_series(1, 100) AS g;


-- ============================================================
-- 11. ALLERGIES
-- ============================================================

INSERT INTO allergies
(patient_id, allergen, reaction, severity)

SELECT

    (
        SELECT patient_id
        FROM patients
        ORDER BY patient_id
        LIMIT 1 OFFSET ((g - 1) % 100)
    ),

    (ARRAY[
        'Penicillin',
        'Dust',
        'Pollen',
        'Peanuts',
        'Shellfish',
        'Latex',
        'Aspirin',
        'Milk'
    ])[floor(random() * 8 + 1)],

    (ARRAY[
        'Rash',
        'Sneezing',
        'Swelling',
        'Breathing difficulty',
        'Stomach discomfort'
    ])[floor(random() * 5 + 1)],

    (ARRAY[
        'Mild',
        'Moderate',
        'Severe'
    ])[floor(random() * 3 + 1)]

FROM generate_series(1, 70) AS g;


-- ============================================================
-- 12. MEDICATIONS
-- ============================================================

INSERT INTO medications
(patient_id, prescribed_by, medicine_name,
 dosage, frequency, start_date,
 end_date, status, instructions)

SELECT

    (
        SELECT patient_id
        FROM patients
        ORDER BY patient_id
        LIMIT 1 OFFSET ((g - 1) % 100)
    ),

    (
        SELECT doctor_id
        FROM doctors
        ORDER BY doctor_id
        LIMIT 1 OFFSET ((g - 1) % 20)
    ),

    (ARRAY[
        'Metformin',
        'Amlodipine',
        'Atorvastatin',
        'Pantoprazole',
        'Paracetamol',
        'Cetirizine',
        'Vitamin D3',
        'Omeprazole',
        'Losartan',
        'Montelukast'
    ])[floor(random() * 10 + 1)],

    (ARRAY[
        '500 mg',
        '5 mg',
        '10 mg',
        '20 mg',
        '40 mg'
    ])[floor(random() * 5 + 1)],

    (ARRAY[
        'Once daily',
        'Twice daily',
        'Every morning',
        'Every night',
        'As needed'
    ])[floor(random() * 5 + 1)],

    CURRENT_DATE - (random() * 700)::integer,

    NULL,

    'active',

    'Take as prescribed by the physician.'

FROM generate_series(1, 150) AS g;


-- ============================================================
-- 13. VITALS
-- ============================================================

INSERT INTO vitals
(patient_id, recorded_at, heart_rate,
 systolic_bp, diastolic_bp, temperature,
 spo2, weight_kg, height_cm)

SELECT

    (
        SELECT patient_id
        FROM patients
        ORDER BY patient_id
        LIMIT 1 OFFSET (g - 1)
    ),

    CURRENT_TIMESTAMP
        - (random() * INTERVAL '365 days'),

    60 + floor(random() * 40)::integer,

    100 + floor(random() * 50)::integer,

    60 + floor(random() * 30)::integer,

    ROUND((36.2 + random() * 1.5)::numeric, 1),

    ROUND((94 + random() * 6)::numeric, 2),

    ROUND((50 + random() * 50)::numeric, 2),

    ROUND((150 + random() * 40)::numeric, 2)

FROM generate_series(1, 100) AS g;


-- ============================================================
-- 14. LAB RESULTS
-- ============================================================

INSERT INTO lab_results
(patient_id, test_name, test_date,
 value, unit, reference_range,
 status, notes)

SELECT

    (
        SELECT patient_id
        FROM patients
        ORDER BY patient_id
        LIMIT 1 OFFSET ((g - 1) % 100)
    ),

    CASE
        WHEN g % 6 = 1 THEN 'HbA1c'
        WHEN g % 6 = 2 THEN 'Hemoglobin'
        WHEN g % 6 = 3 THEN 'Blood Glucose'
        WHEN g % 6 = 4 THEN 'Cholesterol'
        WHEN g % 6 = 5 THEN 'Vitamin D'
        ELSE 'Creatinine'
    END,

    CURRENT_DATE - (random() * 1000)::integer,

    CASE
        WHEN g % 6 = 1 THEN '5.4'
        WHEN g % 6 = 2 THEN '13.2'
        WHEN g % 6 = 3 THEN '96'
        WHEN g % 6 = 4 THEN '185'
        WHEN g % 6 = 5 THEN '32'
        ELSE '0.9'
    END,

    CASE
        WHEN g % 6 = 1 THEN '%'
        WHEN g % 6 = 2 THEN 'g/dL'
        WHEN g % 6 = 3 THEN 'mg/dL'
        WHEN g % 6 = 4 THEN 'mg/dL'
        WHEN g % 6 = 5 THEN 'ng/mL'
        ELSE 'mg/dL'
    END,

    CASE
        WHEN g % 6 = 1 THEN '4.0 - 5.6%'
        WHEN g % 6 = 2 THEN '12 - 17 g/dL'
        WHEN g % 6 = 3 THEN '70 - 100 mg/dL'
        WHEN g % 6 = 4 THEN '< 200 mg/dL'
        WHEN g % 6 = 5 THEN '20 - 50 ng/mL'
        ELSE '0.6 - 1.3 mg/dL'
    END,

    CASE
        WHEN g % 5 = 0 THEN 'Needs Review'
        ELSE 'Normal'
    END,

    'Synthetic laboratory result for demonstration purposes.'

FROM generate_series(1, 200) AS g;


-- ============================================================
-- 15. MEDICAL DOCUMENTS
-- ============================================================

INSERT INTO medical_documents
(patient_id, session_id, document_type,
 document_name, file_path, document_date,
 ocr_status, ocr_text)

SELECT

    patient_id,
    session_id,

    (ARRAY[
        'Prescription',
        'Lab Report',
        'Discharge Summary',
        'Consultation Report',
        'Radiology Report'
    ])[floor(random() * 5 + 1)],

    'medical_document_' || session_id || '.pdf',

    '/documents/medical_document_' ||
        session_id || '.pdf',

    CURRENT_DATE - (random() * 1000)::integer,

    'processed',

    'Synthetic OCR text extracted from medical document.'

FROM patient_sessions
ORDER BY session_id
LIMIT 50;


-- ============================================================
-- 16. DOCUMENT EXTRACTIONS
-- ============================================================

INSERT INTO document_extractions
(document_id, entity_type, entity_name,
 entity_value, confidence, page_number)

SELECT

    document_id,

    (ARRAY[
        'diagnosis',
        'medication',
        'lab_result',
        'procedure'
    ])[floor(random() * 4 + 1)],

    (ARRAY[
        'Hypertension',
        'Metformin',
        'HbA1c',
        'Appendectomy',
        'Blood Glucose',
        'Atorvastatin'
    ])[floor(random() * 6 + 1)],

    'Extracted information from synthetic document.',

    ROUND((0.90 + random() * 0.09)::numeric, 4),

    1

FROM medical_documents;


-- ============================================================
-- 17. CLINICAL NOTES
-- ============================================================

INSERT INTO clinical_notes
(patient_id, doctor_id, appointment_id, note)

SELECT

    patient_id,
    doctor_id,
    appointment_id,

    (ARRAY[
        'Patient presented for routine follow-up. Overall condition stable.',
        'Patient reported mild symptoms. Monitoring recommended.',
        'Continue current management and follow-up.',
        'Patient reported improvement since previous visit.',
        'Persistent symptoms reported. Further evaluation recommended.',
        'Routine examination completed. No acute concerns noted.'
    ])[floor(random() * 6 + 1)]

FROM appointments
WHERE status = 'completed';


-- ============================================================
-- 18. CLINICAL SUMMARIES
-- ============================================================

INSERT INTO clinical_summaries
(
    patient_id,
    session_id,
    summary_text,
    chief_complaint,
    hpi,
    past_medical_history,
    past_surgical_history,
    drug_history,
    allergy_history,
    family_history,
    personal_history,
    review_of_systems,
    prior_investigations,
    red_flags,
    generated_by,
    model_version,
    status
)

SELECT

    ps.patient_id,
    ps.session_id,

    'AI-generated clinical summary for physician review.',

    MAX(
        CASE
            WHEN hr.question_key = 'chief_complaint'
            THEN hr.answer_text
        END
    ),

    MAX(
        CASE
            WHEN hr.question_key = 'onset'
            THEN hr.answer_text
        END
    ),

    MAX(
        CASE
            WHEN hr.question_key = 'past_history'
            THEN hr.answer_text
        END
    ),

    MAX(
        CASE
            WHEN hr.question_key = 'surgery_history'
            THEN hr.answer_text
        END
    ),

    MAX(
        CASE
            WHEN hr.question_key = 'drug_history'
            THEN hr.answer_text
        END
    ),

    'Patient allergy information available in allergy records.',

    MAX(
        CASE
            WHEN hr.question_key = 'family_history'
            THEN hr.answer_text
        END
    ),

    MAX(
        CASE
            WHEN hr.question_key = 'personal_history'
            THEN hr.answer_text
        END
    ),

    MAX(
        CASE
            WHEN hr.question_key = 'review_of_systems'
            THEN hr.answer_text
        END
    ),

    'Previous investigations available in lab_results.',

    CASE
        WHEN ps.red_flag_detected = TRUE
        THEN 'Red flag detected - urgent review required.'
        ELSE 'No red flag detected.'
    END,

    'MediKiosk AI',

    'demo-v1',

    'draft'

FROM patient_sessions AS ps

LEFT JOIN history_responses AS hr
    ON hr.session_id = ps.session_id

GROUP BY
    ps.patient_id,
    ps.session_id,
    ps.red_flag_detected;


-- ============================================================
-- 19. DOCTOR REVIEWS
-- ============================================================

INSERT INTO doctor_reviews
(summary_id, doctor_id, action,
 edited_summary, comments)

SELECT

    summary_id,

    (
        SELECT doctor_id
        FROM doctors
        ORDER BY doctor_id
        LIMIT 1 OFFSET ((summary_id - 1) % 20)
    ),

    'reviewed',

    summary_text,

    'AI-generated summary reviewed by physician.'

FROM clinical_summaries;


-- ============================================================
-- 20. CLINICAL TIMELINE
-- ============================================================

INSERT INTO clinical_timeline
(patient_id, event_date, event_type,
 source_table, source_id, title, description)

SELECT
    patient_id,
    appointment_date,
    'appointment',
    'appointments',
    appointment_id,
    'Clinical Appointment',
    reason

FROM appointments;


INSERT INTO clinical_timeline
(patient_id, event_date, event_type,
 source_table, source_id, title, description)

SELECT
    patient_id,
    diagnosed_date::timestamp,
    'diagnosis',
    'diagnoses',
    diagnosis_id,
    'Diagnosis',
    diagnosis_name || ': ' || notes

FROM diagnoses;


INSERT INTO clinical_timeline
(patient_id, event_date, event_type,
 source_table, source_id, title, description)

SELECT
    patient_id,
    test_date::timestamp,
    'lab_result',
    'lab_results',
    lab_result_id,
    test_name,
    value || ' ' || unit

FROM lab_results;


INSERT INTO clinical_timeline
(patient_id, event_date, event_type,
 source_table, source_id, title, description)

SELECT
    patient_id,
    start_date::timestamp,
    'medication',
    'medications',
    medication_id,
    medicine_name,
    dosage || ' - ' || frequency

FROM medications;


-- ============================================================
-- FINAL CHECK
-- ============================================================

SELECT 'doctors' AS table_name, COUNT(*) AS row_count
FROM doctors

UNION ALL
SELECT 'patients', COUNT(*)
FROM patients

UNION ALL
SELECT 'appointments', COUNT(*)
FROM appointments

UNION ALL
SELECT 'patient_sessions', COUNT(*)
FROM patient_sessions

UNION ALL
SELECT 'consents', COUNT(*)
FROM consents

UNION ALL
SELECT 'history_responses', COUNT(*)
FROM history_responses

UNION ALL
SELECT 'symptoms', COUNT(*)
FROM symptoms

UNION ALL
SELECT 'red_flags', COUNT(*)
FROM red_flags

UNION ALL
SELECT 'ayush_assessments', COUNT(*)
FROM ayush_assessments

UNION ALL
SELECT 'diagnoses', COUNT(*)
FROM diagnoses

UNION ALL
SELECT 'allergies', COUNT(*)
FROM allergies

UNION ALL
SELECT 'medications', COUNT(*)
FROM medications

UNION ALL
SELECT 'vitals', COUNT(*)
FROM vitals

UNION ALL
SELECT 'lab_results', COUNT(*)
FROM lab_results

UNION ALL
SELECT 'medical_documents', COUNT(*)
FROM medical_documents

UNION ALL
SELECT 'document_extractions', COUNT(*)
FROM document_extractions

UNION ALL
SELECT 'clinical_timeline', COUNT(*)
FROM clinical_timeline

UNION ALL
SELECT 'clinical_summaries', COUNT(*)
FROM clinical_summaries

UNION ALL
SELECT 'doctor_reviews', COUNT(*)
FROM doctor_reviews

UNION ALL
SELECT 'clinical_notes', COUNT(*)
FROM clinical_notes;

select * from public.allergies;