import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";


class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();

    // Forme de personalizar a informação na busca da lista.
    // tags = tags.map(tag => (
    //   {...tag, nameCustom: `#${tag.name }`}
    // ))

    return classToPlain(tags);
  }
}

export { ListTagsService }