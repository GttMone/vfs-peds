// const MySQL = require('@overextended/oxmysql').oxmysql;

on('onResourceStart', async (resource) => {
    if (resource !== GetCurrentResourceName()) return;
    console.log(`^4
    #########################
    #       vfs-peds        #
    #                       #
    #    Created by Vito    #
    #    Discord: @.vitoo.  #
    #########################
    ^7`)
    MySQL.prepare(`
        CREATE TABLE IF NOT EXISTS player_peds (
            citizenid VARCHAR(50) PRIMARY KEY NOT NULL,
            model VARCHAR(50) NOT NULL
        );    
    `).then(() => {
        console.log('^2Established database connection^7')
    }).catch(err => {
        console.error('Could not establish database connection. Message: ' + err.message)
    })
})