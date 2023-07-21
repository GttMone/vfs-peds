setImmediate(() => {
    emit('chat:addSuggestion', '/savemodel', 'Saves a ped model to a player and loads it upon join', [
        { name: 'model', help: 'The name of the model, example: csb_avery' },
        { name: 'id', help: '(Optional) The ID of the player to save the model. Leave empty for self.' }
    ]);
    emit('chat:addSuggestion', '/deletemodel', 'Removes the saved ped model from the player', [
        { name: 'id', help: '(Optional) The ID of the player to delete the model. Leave empty for self.' }
    ]);
    emit('chat:addSuggestion', '/loadmodel', 'Load your saved ped model');
});
