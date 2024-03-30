create or replace function entities_with_tag (tag_id integer)
returns table (id integer, name text, image text, type entity_type, uf char(2))
as $$
	with recursive rec_tags as (
		select id from tags where id = tag_id
		union
		select tags.id from tags inner join rec_tags on tags.parent_id = rec_tags.id
	)
	select distinct entities.* from entity_tags
	inner join entities on entity_tags.entity_id = entities.id
	inner join rec_tags on entity_tags.tag_id = rec_tags.id
	where entities.image is not null;
$$ language sql stable;

-- select * from entities_with_tag(4);

create or replace function entities_with_tags (tag_ids integer[])
returns table (id integer, name text, image text, type entity_type, uf char(2))
as $$
declare
	counter integer := 0;
	query_text text := '';
	tag_id integer;
begin
	foreach tag_id in array tag_ids loop
		if counter > 0 then
			query_text := query_text || ' intersect ';
		end if;

		query_text := query_text || 'select * from entities_with_tag(' || tag_id || ')';

		counter := counter + 1;
	end loop;

	if length(query_text) = 0 then
		query_text := 'select * from entities where image is not null';
	end if;

	return query execute query_text;
end;
$$ language plpgsql stable;

-- select * from entities_with_tags(array[4, 5]);
