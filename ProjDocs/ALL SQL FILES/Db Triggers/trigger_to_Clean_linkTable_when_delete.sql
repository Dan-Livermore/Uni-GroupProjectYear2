CREATE TRIGGER [FaceIt].[clean_health_prof_entries]
ON [FaceIt].[Accounts]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DeletedRows TABLE (user_id INT);

    DELETE FROM FaceIt.HealthProfUsers
    OUTPUT deleted.user_id INTO @DeletedRows
    WHERE user_id IN (SELECT user_id FROM deleted) OR prof_id IN (SELECT user_id FROM deleted);

    DELETE FROM FaceIt.Users
    WHERE user_id IN (SELECT user_id FROM @DeletedRows);
END

