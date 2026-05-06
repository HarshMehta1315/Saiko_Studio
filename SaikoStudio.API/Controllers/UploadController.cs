using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;

        public UploadController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost("image")]
        public async Task<ActionResult<ApiResponse<string>>> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return ApiResponse<string>.Error("No file uploaded", 400);

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
                return ApiResponse<string>.Error("Invalid file type. Allowed: jpg, jpeg, png, gif, webp", 400);

            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = $"/uploads/{fileName}";
            return ApiResponse<string>.Ok(fileUrl, "Image uploaded successfully");
        }

        [HttpPost("images")]
        public async Task<ActionResult<ApiResponse<List<string>>>> UploadImages(List<IFormFile> files)
        {
            var urls = new List<string>();

            foreach (var file in files)
            {
                if (file.Length == 0) continue;

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

                if (!allowedExtensions.Contains(extension)) continue;

                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                urls.Add($"/uploads/{fileName}");
            }

            return ApiResponse<List<string>>.Ok(urls, "Images uploaded successfully");
        }
    }
}
