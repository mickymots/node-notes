import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SerializationHelper } from './SerializationHelper';
import { JsonProperty } from './JsonMetaData';

//Address Model - Simple Entity
class Address {
  firstLine: string;
  secondLine: string;
  city: string;
}

// Person Model - Complex Entity (composed of Address model)
class Person {
  @JsonProperty('name1') name: string;
  surName: string;
  age: number;

  @JsonProperty<Address>({ name: 'address', clazz: Address })
  address: Address[];
  constructor() {
    this.name = undefined;
    this.surName = undefined;
    this.age = undefined;
    this.address = undefined;
  }
}

describe('SerializationHelper', () => {
  let DeSerilzedObject: Person;
  let jsonString: String;
  let SerializedObject: String;

  jsonString =
    '{' +
    '"name":"Mark",' +
    '"surname":"Galea",' +
    '"age":30,' +
    '"address":[' +
    '{' +
    '"firstLine":"Some where",' +
    '"secondLine":"Over Here",' +
    '"city":"In This City"' +
    '}' +
    ']' +
    '}';

  beforeEach(() => {
    DeSerilzedObject = SerializationHelper.deserialize(Person, {
      name1: 'Mark',
      surName: 'Galea',
      age: 30,
      address: [
        {
          firstLine: 'Some where',
          secondLine: 'Over Here',
          city: 'In This City'
        }
      ]
    });
  });

  //Test#1: Test return type=undefined when no jsonObject is passed
  it('should return undefined when no jsonObject is passed', () => {
    expect(SerializationHelper.deserialize(Person, undefined)).toBeUndefined();
  });

  //Test#2: Test whether the address object has been constructed
  it('should check Address object is constructed', () => {
    expect(DeSerilzedObject.address.length).toBe(1);
  });

  //Test#3: Test that Object.name is 'Mark'
  it('should check object value', () => {
    expect('Mark').toBe(DeSerilzedObject.name);
  });

  //Test#4: Test should return the expected JSON String when a Json Object is passed
  it('should return the expected JSON String when a Json Object is passed', () => {
    SerializedObject = SerializationHelper.Serialize(
      JSON.parse(String(jsonString))
    );
    expect(jsonString).toBe(SerializedObject);
  });

  //Test#5: Test should return a String with quotes when a String it passed
  it('should return the expected String if a String is passed', () => {
    SerializedObject = SerializationHelper.Serialize('Test string');
    expect('"Test string"').toBe(SerializedObject);
  });
});
