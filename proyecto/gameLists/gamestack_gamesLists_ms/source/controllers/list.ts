import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'List';

const createList = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting List');

    let { id_user, list_name, games_list } = req.body;

    let query = `INSERT INTO user_list (id_user, user_list_name) VALUES ("${id_user}", "${list_name}")`;

    let listPK: any;

    let gamesListQuery = ``;

    await Connect()
        .then(async (connection) => {
            await Query(connection, query) //Creación de lista
                .then((result) => {
                    logging.info(NAMESPACE, 'List created: ', result);

                    listPK = result;

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
            console.info('LLegue hasta aqui');
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });

    Connect()
        .then((connection) => {
            listPK = listPK['insertId'];

            for (let index = 0; index < games_list.length; index++) {
                gamesListQuery = `INSERT INTO user_list_games (id_user_list, id_game) VALUES ("${listPK}", "${games_list[index]}")`;
                console.info('gamesListQuery', gamesListQuery);
                Query(connection, gamesListQuery)
                    .then((result) => {
                        logging.info(NAMESPACE, 'Games Listed: ', result);
                        // return res.status(200).json({
                        //     result
                        // });
                    })
                    .then()
                    .catch((error) => {
                        logging.error(NAMESPACE, error.message, error);

                        return res.status(200).json({
                            message: error.message,
                            error
                        });
                    });
            }
            logging.info(NAMESPACE, 'Closing connection.');
            connection.end();
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};
const getListbyId = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting list.');

    let id_user_list = req.body;



    let query = `SELECT id_game FROM user_list NATURAL JOIN user_list_games WHERE id_user_list = "${id_user_list['id_user_list']}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved list: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};const getAllUserLists = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting list');

    let id_user = req.body;
    console.info('id_user', id_user);

    

    let query = `SELECT * FROM user_list NATURAL JOIN user_list_games WHERE id_user = "${id_user["id_user"]}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved list: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createList, getListbyId, getAllUserLists };
