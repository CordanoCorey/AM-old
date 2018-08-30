using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Login;
using AMSuite2.API.Infrastructure.Models;
using AutoMapper;

namespace AMSuite2.API.Features.Core.Profile
{
    public interface IProfileService
    {
        ProfileModel GetProfile(int userId);
        ProfileModel UpdateProfile(ProfileModel model);
    }

    public class ProfileService : IProfileService
    {
        private readonly IMapper _mapper;
        private readonly ILoginRepository _repo;

        public ProfileService(ILoginRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public ProfileModel GetProfile(int userId)
        {
            var user = _repo.FindByKey(userId);
            return _mapper.Map<ProfileModel>(user);
        }

        public ProfileModel UpdateProfile(ProfileModel model)
        {
            model.User = _repo.FindByKey(model.UserId);
            var userModel = _mapper.Map<CurrentUserModel>(model);
            var user = _repo.Update(userModel);
            return _mapper.Map<ProfileModel>(user);
        }
    }
}
