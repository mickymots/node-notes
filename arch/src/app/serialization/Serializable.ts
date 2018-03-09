/**
 * This interface represent a model that can be deserialized by the
 * SerializationHelper Service.
 */
export interface Serializable<T> {
  deserialize(input: Object): T;
}
