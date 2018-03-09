import { } from "reflect-metadata";

/** 
 * This interface represent MetaData of an Entity class that is being serialized / deseralized by 
 * SerializationHelper class. 
 * Name = Property name in JSON
 * Clazz = Model class in which the JSON values will be set
 */
export interface IJsonMetaData<T> {
	name?: string,
	clazz?: {
		new (): T
	}
}

const jsonMetadataKey = "JsonProperty";


/**
 * This helper function is used retrieve the detailed info from JSON about the type of model
 * that needs to be constructed.
 * @param metadata 
 */
export function JsonProperty<T>(metadata?: IJsonMetaData<T> | string): any {
	if (metadata instanceof String || typeof metadata === "string") {
		return Reflect.metadata(jsonMetadataKey, {
			name: metadata,
			clazz: undefined
		});
	} else {
		let metadataObj = <IJsonMetaData<T>>metadata;

		return Reflect.metadata(jsonMetadataKey, {
			name: metadataObj ? metadataObj.name : undefined,
			clazz: metadataObj ? metadataObj.clazz : undefined
		});
	}
}
