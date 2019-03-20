({
    doCreateGroup: function(component, helper){
        var action = component.get('c.createGroup');

        action.setParams({
            name: component.get("v.groupname"),
            description: component.get("v.description"),
            restricted: component.get("v.restricted")
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                let r = response.getReturnValue();

                if(r.innerError != undefined){
                    helper.showToast(component, helper, "error", r.message);
                    $A.get("e.force:closeQuickAction").fire();
                }
                else{
                    let groupid = r.id;
                    helper.doCreateTeam(component, helper, groupid);
                }
            }
            else if (state === "INCOMPLETE") {}
            else {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
                else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },

    doCreateTeam: function(component, helper, groupid){
        var action = component.get('c.createTeam');

        action.setParams({
            groupid: groupid
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                let r = response.getReturnValue();

                if(r.innerError != undefined){
                    helper.showToast(component, helper, "error", r.message);
                    $A.get("e.force:closeQuickAction").fire();
                }
                else{
                    helper.showToast(component, helper, "success", "Team successfully created.");
                    $A.get("e.force:closeQuickAction").fire();
                }
            }
            else if (state === "INCOMPLETE") {}
            else {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
                else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },

    showToast: function(component, helper, type, message){
        var toast = $A.get("e.force:showToast");

        toast.setParams({
            "type": type,
            "title": (type == "error") ? "Error!" : "Success!",
            "duration": 20000,
            "message": message
        });
        toast.fire();
    }
})
