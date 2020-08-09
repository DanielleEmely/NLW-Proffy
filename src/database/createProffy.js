module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados na tabela de professores
    // com await, a próxima linha só podera ser execuada quando o comnado atual estiver finalizado
    // ára isso, é preciso da palavra "async" antes da função que sa o comando await
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela de classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    // inserir dados na tabela classSchedule
    const insertedAllClasseSchedulesValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })
    // executa todos os dbrun da classe schedules
    await Promise.all(insertedAllClasseSchedulesValues)

}