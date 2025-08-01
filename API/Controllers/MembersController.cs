using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MembersController(IMemberRepository memberRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
    {
        return Ok(await memberRepository.GetMembersAsync());
    }

    [HttpGet("{id}")] // localhost:5001/api/members/bob-id
    public async Task<ActionResult<Member>> GetMemeber(string id)
    {
        var member = await memberRepository.GetMemberByIdAsync(id);

        if (member == null) return NotFound();

        return member;
    }

    [HttpGet("{id}/photos")]
    public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
    {
        return Ok(await memberRepository.GetPhotosForMemberAsync(id));
    }
}