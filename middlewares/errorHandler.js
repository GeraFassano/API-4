const error = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message ||
    'Algo fallo en el servidor' });
    };
    module.exports = error;