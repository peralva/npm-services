import Primitive from './Primitive';

type Json = Json[] | Primitive | { [key: string]: Json };

export default Json;
