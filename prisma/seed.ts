import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("===== SEED COMICVERSE =====");

  await prisma.comic.upsert({
    where: {
      slug: "trang-quynh",
    },
    update: {
      title: "Trạng Quỳnh",
      alternativeTitle: null,
      author: "Kim Khánh",
      artist: "Kim Khánh",
      description:
        "Bộ truyện tranh dân gian nổi tiếng của Việt Nam kể về Trạng Quỳnh – một nhân vật thông minh, hóm hỉnh và luôn dùng trí tuệ để đối đáp với vua quan, địa chủ và những kẻ tham lam. Đây là một trong những bộ truyện gắn liền với tuổi thơ của nhiều thế hệ độc giả Việt Nam.",
      cover: "/covers/trang-quynh.jpg",
      banner: "/covers/trang-quynh.jpg",
      status: "Hoàn thành",
      views: 1250009,
      followers: 12000,
      rating: 4.9,
      publishedYear: 2003,
    },
    create: {
      slug: "trang-quynh",
      title: "Trạng Quỳnh",
      alternativeTitle: null,
      author: "Kim Khánh",
      artist: "Kim Khánh",
      description:
        "Bộ truyện tranh dân gian nổi tiếng của Việt Nam kể về Trạng Quỳnh – một nhân vật thông minh, hóm hỉnh và luôn dùng trí tuệ để đối đáp với vua quan, địa chủ và những kẻ tham lam. Đây là một trong những bộ truyện gắn liền với tuổi thơ của nhiều thế hệ độc giả Việt Nam.",
      cover: "/covers/trang-quynh.jpg",
      banner: "/covers/trang-quynh.jpg",
      status: "Hoàn thành",
      views: 1250009,
      followers: 12000,
      rating: 4.9,
      publishedYear: 2003,
    },
  });

  await prisma.comic.upsert({
    where: {
      slug: "than-dong-dat-viet",
    },
    update: {
      title: "Thần Đồng Đất Việt",
      alternativeTitle: null,
      author: "Lê Linh",
      artist: "Lê Linh",
      description:
        "Thần Đồng Đất Việt kể về bốn người bạn Trạng Tí, Sửu Ẹo, Dần Béo và Cả Mẹo. Bộ truyện tái hiện nhiều câu chuyện dân gian, lịch sử và văn hóa Việt Nam thông qua những chuyến phiêu lưu hài hước và đầy sáng tạo.",
      cover: "/covers/than-dong-dat-viet.jpg",
      banner: "/covers/than-dong-dat-viet.jpg",
      status: "Hoàn thành",
      views: 3520000,
      followers: 35600,
      rating: 5.0,
      publishedYear: 2002,
    },
    create: {
      slug: "than-dong-dat-viet",
      title: "Thần Đồng Đất Việt",
      alternativeTitle: null,
      author: "Lê Linh",
      artist: "Lê Linh",
      description:
        "Thần Đồng Đất Việt kể về bốn người bạn Trạng Tí, Sửu Ẹo, Dần Béo và Cả Mẹo. Bộ truyện tái hiện nhiều câu chuyện dân gian, lịch sử và văn hóa Việt Nam thông qua những chuyến phiêu lưu hài hước và đầy sáng tạo.",
      cover: "/covers/than-dong-dat-viet.jpg",
      banner: "/covers/than-dong-dat-viet.jpg",
      status: "Hoàn thành",
      views: 3520000,
      followers: 35600,
      rating: 5.0,
      publishedYear: 2002,
    },
  });

  await prisma.comic.upsert({
    where: {
      slug: "trang-quynh-nhi",
    },
    update: {
      title: "Trạng Quỷnh",
      alternativeTitle: null,
      author: "Kim Khánh",
      artist: "Kim Khánh",
      description:
        "Trạng Quỷnh là bộ truyện hài lấy cảm hứng từ Trạng Quỳnh nhưng được xây dựng theo phong cách hiện đại hơn với nhiều tình huống vui nhộn, gần gũi và mang tính giải trí cao dành cho thiếu nhi.",
      cover: "/covers/trang-quynh-nhi.jpg",
      banner: "/covers/trang-quynh-nhi.jpg",
      status: "Đang cập nhật",
      views: 1980000,
      followers: 18400,
      rating: 4.8,
      publishedYear: 2010,
    },
    create: {
      slug: "trang-quynh-nhi",
      title: "Trạng Quỷnh",
      alternativeTitle: null,
      author: "Kim Khánh",
      artist: "Kim Khánh",
      description:
        "Trạng Quỷnh là bộ truyện hài lấy cảm hứng từ Trạng Quỳnh nhưng được xây dựng theo phong cách hiện đại hơn với nhiều tình huống vui nhộn, gần gũi và mang tính giải trí cao dành cho thiếu nhi.",
      cover: "/covers/trang-quynh-nhi.jpg",
      banner: "/covers/trang-quynh-nhi.jpg",
      status: "Đang cập nhật",
      views: 1980000,
      followers: 18400,
      rating: 4.8,
      publishedYear: 2010,
    },
  });
  
  await prisma.comic.upsert({
  where: {
    slug: "ti-quay",
  },
  update: {
    title: "Tí Quậy",
    alternativeTitle: null,
    author: "Đào Hải",
    artist: "Đào Hải",
    description:
      "Tí Quậy là bộ truyện tranh thiếu nhi Việt Nam xoay quanh những câu chuyện hài hước, tinh nghịch và gần gũi trong cuộc sống của cậu bé Tí cùng bạn bè và những người xung quanh. Với những tình huống vui nhộn và cách kể chuyện dí dỏm, bộ truyện mang đến nhiều tiếng cười và gắn liền với tuổi thơ của nhiều thế hệ độc giả Việt Nam.",
    cover: "/covers/ti-quay.jpg",
    banner: "/covers/ti-quay.jpg",
    status: "Hoàn thành",
    views: 0,
    followers: 0,
    rating: 0,
    publishedYear: 2003,
  },
  create: {
    slug: "ti-quay",
    title: "Tí Quậy",
    alternativeTitle: null,
    author: "Đào Hải",
    artist: "Đào Hải",
    description:
      "Tí Quậy là bộ truyện tranh thiếu nhi Việt Nam xoay quanh những câu chuyện hài hước, tinh nghịch và gần gũi trong cuộc sống của cậu bé Tí cùng bạn bè và những người xung quanh. Với những tình huống vui nhộn và cách kể chuyện dí dỏm, bộ truyện mang đến nhiều tiếng cười và gắn liền với tuổi thơ của nhiều thế hệ độc giả Việt Nam.",
    cover: "/covers/ti-quay.jpg",
    banner: "/covers/ti-quay.jpg",
    status: "Hoàn thành",
    views: 0,
    followers: 0,
    rating: 0,
    publishedYear: 2003,
  },
});

  console.log("Seed thành công!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });