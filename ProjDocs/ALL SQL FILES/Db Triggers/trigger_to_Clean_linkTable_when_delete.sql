CREATE TRIGGER [FaceIt].[clean_health_prof_entries]
ON [FaceIt].[Accounts]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @deletedUserID int;
    SELECT @deletedUserID = deleted.user_id FROM deleted;

    -- delete any matching entries in HealthProfUsers where user_id or prof_id is @deletedUserID
    DELETE FROM FaceIt.HealthProfUsers
    WHERE user_id = @deletedUserID OR prof_id = @deletedUserID;
END
