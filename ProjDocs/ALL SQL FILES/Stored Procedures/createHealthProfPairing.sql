SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [FaceIt].[add_health_prof_user]
    @prof_id int,
    @user_email nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @user_id int;

    -- get user_id for the provided user_email
    SELECT @user_id = user_id FROM FaceIt.Accounts WHERE user_email = @user_email;

    -- Insert a new record into the HealthProfUsers table with the obtained user_id and provided prof_id
    INSERT INTO FaceIt.HealthProfUsers (user_id, prof_id) VALUES (@user_id, @prof_id);

END
GO
