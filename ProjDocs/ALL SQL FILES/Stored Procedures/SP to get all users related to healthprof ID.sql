SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [FaceIt].[get_assigned_users_by_profID] 
    @hpID int
AS
BEGIN
    SELECT user_id, prof_id
    FROM FaceIt.HealthProfUsers
    WHERE prof_id = @hpID;
END
GO