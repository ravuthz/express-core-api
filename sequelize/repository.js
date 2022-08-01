const debug = require('debug')('express-core-api:repository');

module.exports = (Model) => {

  const save = (data, id = null) => {
    return (id != null)
      ? Model.update(data, {where: {id}})
      : Model.create(data);
  };

  const findAll = (query) => {
    debug({ method: 'findAll', query });
    return Model.findAll(query);
  };

  const findOne = (field) => {
    return Model.findOne({where: field});
  };

  const findById = (id) => {
    return Model.findByPk(id);
  };

  const deleteOne = (field) => {
    return Model.destroy({where: field});
  };

  const deleteById = (id) => {
    return Model.destroy({where: {id}});
  };

  const mapResource = ({ dataValues }) => {
    return {
      ...dataValues
    }
  };

  return {
    save,
    findAll,
    findOne,
    findById,
    deleteOne,
    deleteById,
    mapResource
  };
};