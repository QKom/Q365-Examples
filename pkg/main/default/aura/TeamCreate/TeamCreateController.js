({
    invokeCreateTeam : function(component, event, helper){
        helper.doCreateGroup(component,
                             helper,
                             component.get("v.groupname"),
                             component.get("v.description"),
                             component.get("v.restricted"));
    }
})
