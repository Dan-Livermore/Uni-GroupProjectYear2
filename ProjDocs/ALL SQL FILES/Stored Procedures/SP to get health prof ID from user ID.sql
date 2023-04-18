SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [FaceIt].[get_assigned_prof_by_userID] 
    @userID int
AS
BEGIN
    SELECT prof_id
    FROM FaceIt.HealthProfUsers
    WHERE user_id = @userID;
END
GO