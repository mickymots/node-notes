import { IJsonMetaData } from './JsonMetaData';

/**
 * SerializationHelper has the following 2 main responsibilities:
 * 1. JSON to Model conversion
 * 2. Model to JSON conversion
 */
export class SerializationHelper {
  public static jsonMetadataKey = 'JsonProperty';

  /**
	 * Check whether object is primitive type and
	 * if true return the corresponding Class
	 */
  static isPrimitive(obj) {
    switch (typeof obj) {
      case 'string':
      case 'number':
      case 'boolean':
        return true;
    }
    return !!(
      obj instanceof String ||
      obj === String ||
      obj instanceof Number ||
      obj === Number ||
      obj instanceof Boolean ||
      obj === Boolean
    );
  }

  /**
	 * Check whether object is array
	 */
  static isArray(object) {
    if (object === Array) {
      return true;
    } else if (typeof Array.isArray === 'function') {
      return Array.isArray(object);
    } else {
      return !!(object instanceof Array);
    }
  }

  /**
	 * Returns the class of object
	 */
  static getClazz(target: any, propertyKey: string): any {
    return Reflect.getMetadata('design:type', target, propertyKey);
  }

  /**
	 * Returns the MetaData atatched with the
	 * individual elements of class object
	 */
  static getJsonProperty<T>(
    target: any,
    propertyKey: string
  ): IJsonMetaData<T> {
    return Reflect.getMetadata(
      SerializationHelper.jsonMetadataKey,
      target,
      propertyKey
    );
  }

  /**
	 * Returns the deserialized object from JSON
	 */
  static deserialize<T>(clazz: { new (): T }, jsonObject) {
    if (clazz === undefined || jsonObject === undefined) return undefined;

    // Creates the object of given type in the Argument
    let obj = new clazz();

    // Iterate over the object elemements and populate it from given JSON
    Object.keys(obj).forEach(key => {
      // If property have  metaData attached in form of name and class of element,then it would be considered while settinf the property in the object
      let propertyMetadataFn: (IJsonMetaData) => any = propertyMetadata => {
        let propertyName = propertyMetadata.name || key;
        let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
        let clazz = SerializationHelper.getClazz(obj, key);

        // If Json element is Array
        if (SerializationHelper.isArray(clazz)) {
          let metadata = SerializationHelper.getJsonProperty(obj, key);
          var t = Reflect.getMetadata('design:type', obj, key);

          // metadata.clazz=undefined;
          if (metadata.clazz || SerializationHelper.isPrimitive(clazz)) {
            if (innerJson && SerializationHelper.isArray(innerJson)) {
              return innerJson.map(item =>
                SerializationHelper.deserialize(metadata.clazz, item)
              );
            } else {
              return undefined;
            }
          } else {
            return innerJson;
          }
        } else if (!SerializationHelper.isPrimitive(clazz)) {
          // If Json element is not a Primitive type
          return SerializationHelper.deserialize(clazz, innerJson);
        } else {
          // If Json element is Primitive type
          return jsonObject ? jsonObject[propertyName] : undefined;
        }
      };

      let propertyMetadata = SerializationHelper.getJsonProperty(obj, key);

      if (propertyMetadata) {
        obj[key] = propertyMetadataFn(propertyMetadata);
      } else {
        if (jsonObject && jsonObject[key] !== undefined) {
          obj[key] = jsonObject[key];
        }
      }
    });
    return obj;
  }

  /**
	 * Returns the Serialized JSON String from Object
	 */
  public static Serialize(obj): string {
    var type = typeof obj;
    if (type != 'object' || obj === null) {
      // simple data type
      if (type == 'string') obj = '"' + obj + '"';

      return String(obj);
    } else {
      // recurse array or object
      var n,
        v,
        json = [],
        arr = obj && obj.constructor == Array;
      var check = false;
      for (n in obj) {
        check = true;
        v = obj[n];
        type = typeof v;

        if (type == 'string') v = '"' + v + '"';
        else if (type == 'function') {
          //Ignore the funtion in the class object
          check = false;
          continue;
        } else if (type == 'object' && v !== null && check)
          v = SerializationHelper.Serialize(v);

        json.push((arr ? '' : '"' + n + '":') + String(v));
      }

      var returnedJson = (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');

      return returnedJson;
    }
  }
}
