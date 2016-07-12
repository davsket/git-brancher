/**
 * This module easy a branch creation
 * Inspired in https://github.com/jhermsmeier/git-branch-select
 */
const exec       = require( 'child_process' ).exec
const colour     = require( 'colour' )
const inquirer   = require( 'inquirer' )
const deburr     = require('lodash.deburr')
const argv       = require('yargs')
                    .usage(`This command let you create a branch name easily, you can pass your branch text as the arguments and it will generate a valid branch name from it.
The main recommendation is to surround the text by ", so you can add linebrackes into it.

Usage: $0 [<text>]
       $0 [<text-0> [<text-1> [<text-2> [...]]]]`)
                    .example('$0 ProjectName-2344 Issue description', 'ProjectName-2344-Issue-description')
                    .example(`$0 "ProjectName-2344
Contraseñas están visibles"`, 'ProjectName-2344-Contrasenas-visibles')
                    .help('help')
                    .alias('help', 'h')
                    .argv

/**
 * Transforms any string to a valid branch name
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function toBranchStr(str) {
  return deburr(str) // no accents
    .replace(/[^\w\/]+/g, '-') // keep words and slashes but remove other things like dots and backslashes
    .replace(/(^\-)|(\-$)/g, '') // remove sourounding slashes
}

if (!argv.help) {
  var branchName = toBranchStr(argv._.join(' '))
  console.log('! '.green + 'Your branch name so far: \n'.bold + 'git checkout -b '.gray + branchName.yellow.bold)
  inquirer.prompt([{
    type: 'list',
    name: 'prefix',
    message: 'Would you like to add a prefix? (none)',
    default: '(none)',
    choices: [
      '(none)',
      'fix',
      'feature',
      'hotfix',
      'refactor',
      'chore'
    ]
  }])
  .then( function( results ) {
    const prefix = results.prefix !== '(none)' ? results.prefix + '/' : '';
    console.log('git checkout -b '.gray + (prefix + branchName).green)
    exec( 'git checkout -b ' + prefix + branchName, {
      cwd: process.cwd()
    }, function( error, stdout, stderr ) {
      process.stdout.write( stdout )
      process.stderr.write( stderr )
      process.exit( error ? error.code : 0 )

    })
  })
}
