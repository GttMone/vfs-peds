let Config = {};

// Required permissions to run each command
Config.Permissions = { 
    savemodel: 'admin',
    deletemodel: 'god',
    loadmodel: false // Set to false to allow everyone to use (THIS COMMAND ONLY!)
}