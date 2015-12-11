jQuery(function($) {
    var $body = $('body');

    $body.midgardCreate({
        highlight: false,
    });

    $body.midgardCreate('configureEditor', 'title', 'editWidget', {});

    $body.midgardCreate('widget').midgardWorkflows('setActionType', 'confirm_destroy', function (model, workflow, callback) {
        $body.midgardNotifications('create', {
            bindTo: jQuery('#midgardcreate-workflow_delete'),
            gravity: 'T',
            body: 'Delete ' + model.getSubjectUri() + '?',
            timeout: 0,
            actions: [
                { name: 'Yes', label: 'Yes', cb: function () {
                    jQuery('body').midgardCreate('widget').midgardStorage('saveRemote', model, { success: function(m, response) {
                        m.destroy();
                    }});
                }, className: 'create-ui-btn' },
                { name: 'No', label: 'No', cb: function () {  }, className: 'create-ui-btn' }
            ]
        })
    });

    jQuery(cmfCreatePlainTextTypes).each(function(index, value) {
        $body.midgardCreate('setEditorForProperty', value, 'title');
    });
});
