// import { ProfileBase } from '@automapper/classes';
// import { User } from '@Domain/Entities/User';


// export class AutoMappingProfile extends ProfileBase {
//   constructor(mapper) {
//     super();
//     mapper.CreateMap(User, UserResponseDTO)
//   }
// }

import { Mapper, createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';

export const mapper = createMapper({
  strategyInitializer: pojos(),
});