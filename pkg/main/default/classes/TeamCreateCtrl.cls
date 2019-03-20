public class TeamCreateCtrl {
    @AuraEnabled
    public static Object createGroup(String name, String description, Boolean restricted){
        return qkom365.GraphUtils.createGroup(name, description, restricted);
    }

    @AuraEnabled
    public static Object createTeam(String groupid){
        return qkom365.GraphUtils.createTeam(groupid);
    }
}
