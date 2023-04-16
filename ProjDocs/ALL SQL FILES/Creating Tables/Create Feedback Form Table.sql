CREATE TABLE FaceIt.Feedback_Forms (
    user_id int NOT NULL,
    session_number int NOT NULL,
    q1 int,
    q2 int,
    q3 int,
    q4 int,
    q5 int, 
    text_entry varchar (255)

    CONSTRAINT FeedbackCompositeKey PRIMARY KEY (user_id, session_number)     
)